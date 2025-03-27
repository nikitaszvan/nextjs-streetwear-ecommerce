// External Libraries
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

const getRedisClient = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
    return redisClient;
}

export default getRedisClient;