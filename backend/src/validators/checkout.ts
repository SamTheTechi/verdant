import { z } from "zod";

export const BuyoneValidator = z.object({
  productId: z.string(),
})

export const VarifyValidator = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
})
