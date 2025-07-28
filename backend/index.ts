import "dotenv/config";

import express, { Express } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import path from "path";
import cors from 'cors';

import RateLimit from './src/middleware/ratelimiter';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { productRoute } from './src/routes/products';
import { authRoute } from './src/routes/auth';
import { cartRoute } from './src/routes/cart';
import { checkoutRoute } from "./src/routes/checkout";
import { metricsRoute } from "./src/routes/metrics";
import { swaggerSpec, swaggerCssUrl } from "./src/core/swagger";
import { MetricsMiddleware } from "./src/middleware/metrics";
import { PoweredBy } from "./src/middleware/poweredBy";

const app: Express = express();

const port: number = Number(process.env.PORT) || Number(process.env.LOCALPORT);


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: [
        "'self'",
        "data:",
        "https://i.scdn.co",
        "https://*.pinimg.com"
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://checkout.razorpay.com",
        "https://cdnjs.cloudflare.com"
      ],
      fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",
      ],
      frameSrc: ["'slef'", "https://api.razorpay.com"],
      connectSrc: ["'self'",
        "https://lumberjack.razorpay.com",
        "https://verdant.samthetechi.site"
      ],
    },
  }),
);

app.use(PoweredBy())
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './dist')));

app.use('/api/v1/', metricsRoute);
app.use(MetricsMiddleware());

app.use('/api/v1/', productRoute);
app.use('/api/v1/auth/', authRoute);
app.use('/api/v1/cart/', cartRoute);
app.use('/api/v1/pay/', checkoutRoute);
app.use('/api/', RateLimit);


app.all('/api/*', async (_, res) => {
  return res.status(404).json({ message: 'API route not found' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customfavIcon: '/logo.svg',
  customCssUrl: swaggerCssUrl,
}));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, "./dist", "index.html"));
});


let cachedDb: typeof mongoose | null = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI!);
  cachedDb = db;
  return db;
}

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, '0.0.0.0');

  } catch (e) {
    process.exit(1)
  }
}
startServer()
