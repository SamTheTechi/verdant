import { Response } from 'express';
import { ExtendedRequset } from '../../types/express';
import { redis } from '../../core/redis';
import ProductSchema from '../../model/product';
import CartSchema from '../../model/cart';


export const getItem = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;
  if (!userId) return res.status(404).json({ message: 'invalid userId' });

  const key = `cart:${userId}`;

  try {
    let cache = await redis.get(key);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const cartItem = await CartSchema.findOne({ userId: userId }).lean();
    if (!cartItem || cartItem.cart.length <= 0) return res.status(200).json([]);

    const productIds = cartItem.cart.map(item => item.productId);

    const products = await ProductSchema.find({
      _id: { $in: productIds }
    }).select(`_id name image price`).lean();

    const productMap = new Map(products.map(p => [p._id.toString(), p]));

    const data = cartItem.cart.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) return null;
      return {
        ...product,
        count: item.count
      }
    }).filter(Boolean);

    await redis.set(key, JSON.stringify(data), 'EX', 60 * 10);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ message: 'server error ' });
  }
};
