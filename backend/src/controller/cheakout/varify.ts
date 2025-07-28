import crypto from 'crypto';
import { ExtendedRequset } from '../../types/express';
import { Response } from 'express';
import { VarifyValidator } from '../../validators/checkout';


export const varify = async (req: ExtendedRequset, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = VarifyValidator.parse(req.body);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (e) {
    res.status(400).json({ error: 'Invalid signature' });
  }
};

