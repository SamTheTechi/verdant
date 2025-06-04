import { Response } from 'express';
import { redis } from '../../core/redis';
import { ExtendedRequset } from '../../types/express';
import ProductSchema from '../../model/product';
import CartSchema from '../../model/cart';


export const clearItem = async (req: ExtendedRequset, res: Response) => {
  const { productId } = req.body;
  const userId = req.user;

  if (!userId) return res.status(400).json({ message: `invalid userId` });

  const key = `cart:${userId}`;

  try {
    const getItem = await ProductSchema.findById({ _id: productId });
    if (!getItem) return res.status(404).json({ message: 'product not found' });

    const userCart = await CartSchema.findOne({ userId: userId });
    if (!userCart)
      return res.status(404).json({ message: `user's cart not found` });

    const itemIndex = userCart.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: 'product not found in cart' });

    userCart.cart.splice(itemIndex, 1);
    await userCart.save();

    await redis.del(key);

    res.status(200).json({ message: 'item removed' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'server error' });
  }
};


