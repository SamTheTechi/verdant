import { Response } from 'express';
import { ExtendedRequset } from '../../types/express';
import { redis } from '../../core/redis';
import CartSchema from '../../model/cart';


export const clearCart = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;
  if (!userId) return res.status(400).json({ message: `invalid userId` });

  const key = `cart:${userId}`;

  try {
    const userCart = await CartSchema.findOne({ userId: userId });

    if (!userCart)
      return res.status(404).json({ message: `user's cart not found` });

    userCart.cart.splice(0, userCart.cart.length);
    await userCart.save();

    await redis.del(key);

    res.status(200).json({ message: 'cart empty' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: `server error` });
  }
};
