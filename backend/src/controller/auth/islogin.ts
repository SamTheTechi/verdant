import { Response } from 'express';
import { ExtendedRequset } from '../../types/express';

export const IsUserLogin = async (req: ExtendedRequset, res: Response) => {
  try {
    const token: undefined | string = req.cookies.access_token;
    if (token) {
      return res.status(200).json({ value: true });
    } else {
      return res.status(200).json({ value: false });
    }
  } catch (e) {
    res.status(500).json({ message: `server error` });
    return
  }
};
