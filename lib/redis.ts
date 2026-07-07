import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
  // Prevent Next.js static build errors caused by Upstash's default 'no-store' fetch
  // @ts-ignore - Upstash accepts a custom fetch implementation but TypeScript definitions may omit it
  fetch: (url: string, init: RequestInit) => {
    return fetch(url, {
      ...init,
      cache: 'no-cache',
    });
  },
} as any);
