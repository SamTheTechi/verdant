import { Request, Response } from 'express';
import ProductSchema from '../../model/product';
import { redis } from '../../core/redis';

export const productPage = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    if (!productId)
      return res.status(404).json({ message: `invalid parameter` });

    let cache = await redis.get(productId);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const getitem = await ProductSchema.findById({ _id: productId });
    await redis.set(productId, JSON.stringify(getitem), 'EX', 60 * 10);

    res.status(200).json(getitem);
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};
