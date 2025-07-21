import Redis from "ioredis";
import { Counter } from "prom-client";

export const redisGetCounter = new Counter({
  name: 'redis_get_request_total',
  help: 'Total GET calls to redis',
});

export const redisSetCounter = new Counter({
  name: 'redis_set_request_total',
  help: 'Total SET calls to redis',
});

const redis = new Redis(process.env.REDIS_URI);

// as we're using redis url (upstash) so tracking pain that's why custom counter
const OriginalGet = redis.get.bind(redis);
const OriginalSet = redis.set.bind(redis);

redis.get = async (...args: any) => {
  redisGetCounter.inc();
  return OriginalGet(...args)
}

redis.set = async (...args: any) => {
  redisSetCounter.inc();
  return OriginalSet(...args)
}


export { redis }

