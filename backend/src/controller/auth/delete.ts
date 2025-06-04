import { Response } from 'express';
import { ExtendedRequset } from '../../types/express';
import bcrypt from 'bcrypt';
import CartSchema from '../../model/cart';
import UserSchema from '../../model/auth'

export const UserRemove = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;
  const { password } = req.body;
  try {
    const user = await UserSchema.findById({ _id: userId }).lean();
    if (!user) return res.status(404).json({ message: `user not found` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ message: `invalid credentials` });

    await UserSchema.findByIdAndDelete({ _id: userId });
    await CartSchema.findOneAndDelete({ userId: userId });

    return res
      .status(200)
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .json({ message: `user deleted` });
  } catch (e) {
    res.status(500).json({ message: `server error` });
    return;
  }
};
