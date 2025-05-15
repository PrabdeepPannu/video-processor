import { bucket } from "../utils/firebase_client";
import { createRedisClient } from "../utils/redis_client";
import { sendVideoStrem } from "../utils/python_service_client";

export class VideoProcessingService {
  private redis = createRedisClient();

  /**
   * Download video from Firebase, process via Python OCR service,
   * cache and return metadata.
   */
  async downloadAndProcessVideo(
    id: string,
    firebasePath: string
  ): Promise<any> {
    const cacheKey = `video:${id}:metadata`;

    // Attempt to load existing metadata from Redis
    const raw = await this.redis.hget(cacheKey, 'metadata');
    if (raw) {
      try {
        const existing = JSON.parse(raw);
        if (existing && Object.keys(existing).length) {
          console.log(`Cache hit for ${cacheKey}`);
          return existing;
        }
      } catch {
        console.warn(`Error: While processing JSON`);
      }
    }

    // Not cached: download and process
    const sendStream = bucket.file(firebasePath).createReadStream();

    console.log(`Processing video ${id}`);
    const videoData = await sendVideoStrem(id, sendStream, this.redis);

    // Store metadata under 'metadata' field
    await this.storeVideoData(id, videoData);
    return videoData;
  }

  /**
   * Store processed video data in Redis under a single field.
   */
  private async storeVideoData(
    id: string,
    videoData: any
  ): Promise<void> {
    if (!videoData) {
      console.log(`No data for video:${id}`);
      return;
    }

    const cacheKey = `video:${id}:metadata`;
    const json = JSON.stringify(videoData);
    console.log(`Caching metadata for ${cacheKey}`);
    await this.redis.hset(cacheKey, 'metadata', json);
  }

  async cleanup(): Promise<void> {
    console.log("Closing Redis connection");
    await this.redis.quit();
  }
}
