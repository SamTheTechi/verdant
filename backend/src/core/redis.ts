import Redis from "ioredis";

export const redis = new Redis({
  host: "localhost"!,
  name: "my_redis"!,
  port: 6379!
});
;
