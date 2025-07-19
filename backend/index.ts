import "dotenv/config";

import express, { Express } from 'express';
import mongoose from 'mongoose';
// import helmet from 'helmet';
import cors from 'cors';

import RateLimit from './src/middleware/ratelimiter';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

import { productRoute } from './src/routes/products';
import { authRoute } from './src/routes/auth';
import { cartRoute } from './src/routes/cart';
import { checkoutRoute } from "./src/routes/checkout";

const app: Express = express();

const port: number = Number(process.env.PORT) || Number(process.env.LOCALPORT);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       imgSrc: ["'self'", "data:", "https://i.scdn.co", "https://*.pinimg.com"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "https://checkout.razorpay.com"],
//       fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
//       styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
//       frameSrc: ["'sledf'", "https://api.razorpay.com"],
//       connectSrc: ["'self'", "https://lumberjack.razorpay.com"],
//     },
//   }),
// );
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cookieParser());

app.use('/api/', productRoute);
app.use('/api/auth/', authRoute);
app.use('/api/cart/', cartRoute);
app.use('/api/pay/', checkoutRoute);
app.use('/api/', RateLimit);
app.all('/api/*', (_, res) => {
  res.status(404).json({ error: 'API route not found' });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    app.listen(port, '0.0.0.0', () => {
      console.log(`[server]: Server is running at http://0.0.0.0:${port}`);
    });
  } catch (e) {
    console.error('[error]: Failed to connect to MongoDB:', e);
    process.exit(1);
  }
};

startServer();
