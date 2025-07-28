import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserSchema from '../../model/auth';
import { LoginValidator } from '../../validators/auth';

export const Userlogin = async (req: Request, res: Response) => {
  try {

    const { email, password } = LoginValidator.parse(req.body);

    try {

      const user = await UserSchema.findOne({ email: email }).lean();
      if (!user)
        return res.status(200).json({ message: `user not found` });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: `invalid credentials` });

      const refresh_token = jwt.sign(
        { email: email, _id: user._id },
        process.env.JWT_REFRESH_TOKEN as string,
        { expiresIn: '7d' }
      );

      const access_token = jwt.sign(
        { email: email, _id: user._id },
        process.env.JWT_TOKEN,
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
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .json({ message: `login successful` });
    } catch (e) {
      res.status(500).json({ message: `server error ${e.message}` });
      return
    }
  } catch (err) {
    res.status(400).json({ message: `${err}` });
    return
  }
};



