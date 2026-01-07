import { Redis } from '@upstash/redis';

export const redis = new Redis({
    url: process.env.CACHE_UPSTASH_REDIS_REST_URL!,
    token: process.env.CACHE_UPSTASH_REDIS_REST_TOKEN!,
});