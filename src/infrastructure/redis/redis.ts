// src/infrastructure/redis/redis.ts
import { Redis } from 'ioredis'

const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'redis',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
})

export default redisClient
