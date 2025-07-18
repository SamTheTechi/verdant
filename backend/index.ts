import "dotenv/config";

import express, { Express } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

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
    origin: ['http://localhost:5173', 'http://192.168.26.68:5173', 'https://verdant.samthetechi.site/'],
    credentials: true,
  })
);
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https://i.scdn.co"],
  },
}));
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/v1/', productRoute);
app.use('/api/v1/auth/', authRoute);
app.use('/api/v1/cart/', cartRoute);
app.use('/api/v1/pay/', checkoutRoute);
app.use('/api/', RateLimit);
app.get('*', (_, res: any) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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
