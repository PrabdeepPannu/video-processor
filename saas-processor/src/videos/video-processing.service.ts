import { pipeline, Transform } from "stream";
import { promisify } from "util";
import { Redis } from "ioredis";
import { createWorker, Worker } from "tesseract.js";
import { bucket } from "./firebase";
import ffmpeg = require("fluent-ffmpeg");
import { mkdir, readdir, readFile, unlink, rm } from "fs/promises";
import { createWriteStream } from "fs";
import * as path from "path";

const asyncPipeline = promisify(pipeline);
const CHUNK_SIZE = 512 * 1024; // 512KB
const MIN_FRAME_WIDTH = 64; // skip or scale frames smaller than this

export class VideoProcesingService {
  private redis: Redis;
  private worker!: Worker;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "redis",
      port: parseInt(process.env.REDIS_PORT || "6379", 10),
      retryStrategy: t => Math.min(t * 100, 3000),
    });
    this.initTesseractWorker();
  }

  private async initTesseractWorker(): Promise<void> {
    try {
      this.worker = await createWorker();
      await this.worker.recognize("eng");
    } catch (err) {
      console.error("Tesseract initialization error:", err);
    }
  }

  async downloadAndProcessVideo(id: string, firebasePath: string): Promise<void> {
    if (!id || !firebasePath) throw new Error("Missing id or firebasePath");
    const file = bucket.file(firebasePath);

    // 1) Store chunks in Redis
    const storeChunks = asyncPipeline(
      file.createReadStream(),
      this.chunkVideoStream(id)
    ).catch(err => console.error("Chunk pipeline error:", err));

    // 2) Download full video then extract frames
    const downloadPath = `/tmp/video-${id}.mp4`;
    await this.downloadToFile(file, downloadPath);
    const extractAndProcess = this.extractAndProcessFrames(id, downloadPath)
      .catch(err => console.error("Frame extraction error:", err));

    await Promise.all([storeChunks, extractAndProcess]);
    await unlink(downloadPath).catch(() => {});
    console.log(`Video ${id} fully processed`);
  }

  private chunkVideoStream(id: string): Transform {
    let buffer = Buffer.alloc(0);
    const redis = this.redis;
    return new Transform({
      transform(chunk, _, cb) {
        buffer = Buffer.concat([buffer, chunk]);
        if (buffer.length >= CHUNK_SIZE) {
          redis.lpush(`videoChunks:${id}`, buffer.toString("base64"))
            .catch(e => console.error(`Chunk store fail ${id}:`, e));
          buffer = Buffer.alloc(0);
        }
        cb(null, chunk);
      },
      flush(cb) {
        if (buffer.length) {
          redis.lpush(`videoChunks:${id}`, buffer.toString("base64"))
            .catch(e => console.error(`Final chunk fail ${id}:`, e));
        }
        cb();
      }
    });
  }

  private async downloadToFile(file: any, destPath: string): Promise<void> {
    const writeStream = createWriteStream(destPath);
    const readStream = file.createReadStream();
    await asyncPipeline(readStream, writeStream);
  }

  private async extractAndProcessFrames(id: string, videoPath: string): Promise<void> {
    const tmpDir = `/tmp/frames-${id}`;
    await mkdir(tmpDir, { recursive: true });

    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        // extract 1 frame per second, scale small frames to at least MIN_FRAME_WIDTH
        .outputOptions([`-vf fps=1,scale='if(gt(iw,${MIN_FRAME_WIDTH}),iw,${MIN_FRAME_WIDTH}):-1'`, "-c:v png"])
        .output(path.join(tmpDir, "frame-%03d.png"))
        .noAudio()
        .on("end", async () => {
          try {
            await this.processExtractedFrames(id, tmpDir);
            resolve();
          } catch (e) {
            reject(e);
          }
        })
        .on("error", err => reject(err))
        .run();
    });
  }

  private async processExtractedFrames(id: string, tmpDir: string) {
    try {
      const files = (await readdir(tmpDir)).sort();
      for (const fileName of files) {
        const fullPath = path.join(tmpDir, fileName);
        const data = await readFile(fullPath);
        const frameKey = `vid-${id}-frame-${fileName}`;
        await this.redis.lpush(`frames:${id}`, frameKey);
        await this.detectPlayerProminence(id, data, frameKey);
        await unlink(fullPath);
      }
      await rm(tmpDir, { recursive: true });
    } catch (err) {
      console.error(`Error processing frames for ${id}:`, err);
    }
  }

  private async detectPlayerProminence(id: string, img: Buffer, frameKey: string) {
    if (!this.worker) return console.error("Tesseract not ready");
    try {
      const { data: { text } } = await this.worker.recognize(img);
      const jersey = text.match(/\d{1,3}/)?.[0];
      if (!jersey) return;
      const duration = 10;
      const size = 0.05;
      const prominence = duration * size;
      await this.redis.hset(`player:${id}:${jersey}`, {
        duration: duration.toString(),
        prominence: prominence.toString(),
      });
    } catch (e: any) {
      // skip frames too small or unrecognized
      console.warn(`Skipping frame ${frameKey}:`, e.message || e);
    }
  }

  async cleanup() {
    if (this.worker) await this.worker.terminate();
    await this.redis.quit();
  }
}