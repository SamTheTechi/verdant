import { Response } from 'express';
import { ExtendedRequset } from '../../types/express';
import { redis } from '../../core/redis';
import ProductSchema from '../../model/product';
import CartSchema from '../../model/cart';
import { AddItemValidator } from '../../validators/cart';

export const addItem = async (req: ExtendedRequset, res: Response) => {
  try {
    const { productId, count } = AddItemValidator.parse(req.body);
    const userId = req.user;

    const key = `cart:${userId}`;

    try {
      const getItem = await ProductSchema.findById({ _id: productId }).lean();
      if (!getItem) return res.status(404).json({ message: 'product not found' });

      let userCart = await CartSchema.findOne({ userId: userId });
      if (!userCart) userCart = await CartSchema.create({ userId: userId });

      const cartItem = userCart.cart.find((item) => item.productId === productId);
      if (cartItem) cartItem.count += parseInt(count);
      else userCart.cart.push({ productId, count });

      await userCart.save();

      await redis.del(key)

      res.status(200).json({ message: 'product added' });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: `server error` });
    }
  } catch (e) {
    res.status(400).json({ message: `${e}` });
  }
};

