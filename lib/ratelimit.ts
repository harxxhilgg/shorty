import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows:
// 10 shorten requests per 1 day
// 20 QR code requests per 1 day
export const shortenRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 d"),
  analytics: true,
  prefix: "@upstash/ratelimit/shorten",
});

export const qrRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(20, "1 d"),
  analytics: true,
  prefix: "@upstash/ratelimit/qr",
});
