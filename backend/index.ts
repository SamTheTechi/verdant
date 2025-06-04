import "dotenv/config";

import express, { Express } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
// import path from 'path';

import RateLimit from './src/middleware/ratelimiter';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';

import { productRoute } from './src/routes/products';
import { authRoute } from './src/routes/auth';
import { cartRoute } from './src/routes/cart';
import { checkoutRoute } from "./src/routes/checkout";

const app: Express = express();

const port = process.env.PORT || process.env.LOCALPORT;

app.use(
  cors({
    origin: 'http://localhost:5173',
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
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', productRoute);
app.use('/api/v1/auth/', authRoute);
app.use('/api/v1/cart/', cartRoute);
app.use('/api/v1/pay/', checkoutRoute);
app.use('/api/', RateLimit);
// app.get('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const Start = () => {
  app.listen(port, async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
    } catch (e) {
      console.error(e);
    }
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

Start();
