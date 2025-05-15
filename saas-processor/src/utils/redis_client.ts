// src/utils/redisClient.ts
import { Redis } from "ioredis";

export const createRedisClient = (): Redis => {
  return new Redis({
    host: process.env.REDIS_HOST || "redis",
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
    retryStrategy: t => Math.min(t * 100, 3000),
  });
};
