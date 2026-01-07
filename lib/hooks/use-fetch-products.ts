// Data Access Layer
import { redis } from '@/lib/config/upstash-vk-config';

export const fetchCategoryProducts = async (pk: string) => {
  const categoryKey = decodeURIComponent(pk);
  const data = await redis.hgetall(categoryKey);
  return data ? Object.values(data) : [];
};