import { Response } from "express";
import { collectDefaultMetrics, Histogram, Registry } from "prom-client"
import { redisGetCounter, redisSetCounter } from "../../core/redis";


const registry = new Registry();

collectDefaultMetrics({ register: registry });
registry.registerMetric(redisSetCounter);
registry.registerMetric(redisGetCounter);


export const httpReqDurationSec = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durations of HTTP requests in secondes',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 3, 5],
  registers: [registry],
});


export const ExportMetrics = async (_: any, res: Response) => {
  try {
    res.setHeader('Content-Type', registry.contentType);
    return res.end(await registry.metrics());
  } catch (e) {
    return res.status(500).json({ message: `oops server error` });
  }
}
