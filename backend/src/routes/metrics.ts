import express, { Router } from 'express';
import { ExportMetrics } from '../controller/metrics/metrics';

export const metricsRoute: Router = express.Router();

metricsRoute.get('/metrics', ExportMetrics);
