import { Response } from 'express';
import { ExtendedRequset } from '../../types/express';

export const Userlogout = async (req: ExtendedRequset, res: Response) => {
  try {
    return res
      .status(200)
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .json({ message: 'logout successful' });
  } catch (e) {
    res.status(500).json({ message: 'server error' });
    return;
  }
};
