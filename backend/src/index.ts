import { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

const PORT = 5000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  res.json({
    name: `anigha`,
    relation: `besti`,
  });
});

const Start = () => {
  app.listen(PORT, () => {
    console.log(`server runnig at port ${PORT}`);
  });
};

Start();
