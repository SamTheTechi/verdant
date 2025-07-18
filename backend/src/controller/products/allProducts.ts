import { Request, Response } from 'express';
import ProductSchema from '../../model/product';
import { redis } from '../../core/redis';

export const allProducts = async (req: Request, res: Response) => {
  const { category, price, page, sort } = req.query;
  let parsePrice = parseFloat(price as string);
  let parsePage = parseInt(page as string);
  let sortOrder: 1 | -1 = sort === 'asc' ? 1 : -1;

  if (isNaN(parsePage)) parsePage = 0;
  if (isNaN(parsePrice)) parsePrice = Infinity;

  const key = `products:${category || 'all'}:${parsePrice}:${parsePage}:${sortOrder}`;

  try {

    const cache = await redis.get(key);
    if (cache) {
      return res.status(200).json(JSON.parse(cache));
    }

    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    filter.price = { $lte: parsePrice };

    const getitem = await ProductSchema.find(filter)
      .limit(12)
      .sort({ price: sortOrder })
      .skip(parsePage * 10).lean();

    const response = { getitem, length: getitem.length };
    await redis.set(key, JSON.stringify(response), 'EX', 60 * 30);

    res.status(200).json({ getitem, length: getitem.length });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};
