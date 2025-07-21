import { NextFunction, Request, Response } from "express";

export const PoweredBy = () => {
  return (_: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Powered-By", "Verdent Engine ;\)");
    next();
  }
}
