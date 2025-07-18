import { ExtendedRequset } from '../../types/express';
import { Response } from 'express';
import { razorpay } from '../../core/razorpay';
import CartSchema from "../../model/cart";
import ProductSchema from '../../model/product';

export const cheakout = async (req: ExtendedRequset, res: Response) => {
  const userId = req.user;
  console.log(userId);
  if (!userId)
    return res.status(400).json({ message: `invalid userId` });

  try {
    const userCart = await CartSchema.findOne({ userId: userId }).lean();
    if (!userCart)
      return res.status(404).json({ message: `cart not found` });

    const productIds = userCart.cart.map(item => item.productId);

    const products = await ProductSchema.find({
      _id: { $in: productIds }
    }).select(`_id price`).lean();

    const productMap = new Map(products.map(p => [p._id.toString(), p.price]));

    const price = userCart.cart.reduce((acc, item) => {
      const price = productMap.get(item.productId);
      if (!price) return acc;
      return acc + price * item.count;
    }, 0);

    const totalPrice = Math.ceil(price * 100);

    if (totalPrice <= 0)
      return res.status(400).json({ message: `Invalid total price` });

    const order = await razorpay.orders.create({
      amount: totalPrice,
      currency: "INR",
      receipt: `receipt#${userId}`,
    });

    res.status(200).json({ order_id: order.id, amount: totalPrice });
  } catch (e) {
    res.status(500).json({ message: `server error` });
    console.log(e)
  }
};
