import axios from "axios";
import { Redis } from "ioredis";
import FormData = require("form-data");

export interface PlyaerStats {
  avg_size: number;
  duration: number;
  in_point: number;
  max_size: number;
  out_point: number;
  prominence_score: number;
}

export interface PlayerData {
  jersey: string; // Jersey number as string
  stats: PlyaerStats; // Plater stats object
}

export interface OCRResponse {
  data: Record<string, PlyaerStats>; // Mapping from jersey to stats
  error: string | null; // Error message if any
  success: boolean; // OCR call success flag
}

/**
 * Send a video strem to the OCR service, save to Redis, and return array of PlyaerData.
 *
 * This funciton forms multipart-form data, sends to the endpoint, and caches the result.
 *
 * @param id - unique id for the video
 * @param videoStream - readble stream of the video file
 * @param redis - ioredis client instance
 * @returns Promise resolving to list of PlyaerData
 */
export async function sendVideoStrem(
  id: string,
  videoStream: NodeJS.ReadableStream,
  redis: Redis
): Promise<PlayerData[]> {
  const serviceUrl = process.env.PYTHON_SERVICE_URL || 'http://ocr-service:5000';
  const endpoint = `${serviceUrl.replace(/\/+$/, '')}/detect`;
  console.log(`Sending video ${id} to OCR service at ${endpoint}`);

  // Prepare form data with the video file
  const form = new FormData();
  form.append('video', videoStream, { filename: `${id}.mp4` });

  try {
    const response = await axios.post<OCRResponse>(endpoint, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    console.log(`OCR service respnded with status ${response.status}`);
    const { data, success } = response.data;
    if (!success || !data) {
      // Unexpected response structure
      throw new Error(`OCR returned invalid respone: ${JSON.stringify(response.data)}`);
    }

    // Transform data object into array
    const players: PlayerData[] = Object.entries(data).map(
      ([jersey, stats]) => ({ jersey, stats })
    );

    // Cache the result under a simple key
    await redis.set(id, JSON.stringify(players));
    console.log(`Stored OCR result for video ${id} in Redis`);

    return players;
  } catch (err) {
    console.error(`Error during OCR processing for video ${id}:`, (err as Error).message);
    throw err;
  }
}
