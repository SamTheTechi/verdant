import { NextFunction, Request, Response } from "express";
import { httpReqDurationSec } from "../controller/metrics/metrics";

export const MetricsMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const end = httpReqDurationSec.startTimer();
    res.on('finish', () => {
      end({
        method: req.method,
        route: req.route?.path || req.path,
        status_code: req.statusCode,
      })
    })
    next();
  }
}
