import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import UserSchema from '../../model/auth';

export const UserSignup = async (req: Request, res: Response) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res.status(400).json({ message: `please provide all the information` });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await hash(password, salt);
  try {
    const user = await UserSchema.create({
      name: name,
      email: email,
      password: hashed,
    });

    const refresh_token = jwt.sign(
      { email: email, _id: user._id },
      process.env.JWT_REFRESH_TOKEN as string,
      { expiresIn: '1d' }
    );

    const access_token = jwt.sign(
      { email: email, _id: user._id },
      process.env.JWT_TOKEN as string,
      { expiresIn: '30m' }
    );
    res
      .status(201)
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 30,
      })
      .cookie('refresh_token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 1,
      })
      .json({ message: `user created` });
  } catch (e) {
    res.status(500).json({ message: `server error` });
    return;
  }
};
