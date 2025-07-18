import { Request } from 'express';

export interface ExtendedRequset extends Request {
  user?: {
    email: string;
    _id: string;
    iat: number;
  };
}
