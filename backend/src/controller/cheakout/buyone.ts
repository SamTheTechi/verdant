import { ExtendedRequset } from '../../types/express';
import { Response } from 'express';
import { razorpay } from '../../core/razorpay';
import ProductSchema from "../../model/product";


export const buyone = async (req: ExtendedRequset, res: Response) => {
  const { productId } = req.body;
  const userId = req.user;

  if (!productId || !userId)
    return res.status(400).json({ message: `invalid userId and productId` });

  try {
    const getitem = await ProductSchema.findById({ _id: productId });
    if (!getitem)
      return res.status(404).json({ message: `product not found` });

    const price = Math.ceil(getitem.price * 100);

    const order = await razorpay.orders.create({
      amount: price,
      currency: "INR",
      receipt: `receipt#${userId}`,
    });

    res.status(200).json({ order_id: order.id, amount: price });
  } catch (e) {
    res.status(500).json({ message: `server error` });
  }
};
