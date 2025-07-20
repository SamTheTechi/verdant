import { Response } from 'express';
import { ExtendedRequset } from '../../types/express';
import jwt from 'jsonwebtoken';

export const RefreshToken = async (req: ExtendedRequset, res: Response) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) return res.status(400).json({ message: 'user not found' });

  try {
    const data = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_TOKEN as string
    );
    const newAccess_token = jwt.sign(data, process.env.JWT_TOKEN as string, {
      expiresIn: '30m',
    });

    res.status(200).cookie('access_token', newAccess_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 30,
    });
  } catch (e) {
    res.status(500).json({ message: `server error` });
    return;
  }
};
