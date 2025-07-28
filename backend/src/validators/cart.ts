import { z } from "zod";

export const AddItemValidator = z.object({
  productId: z.string({ required_error: "Product ID is required" }),
  count: z.string({ required_error: "Count is required" })
}).strict()

export const ClearitemValidator = z.object({
  productId: z.string({ required_error: "Product ID is required" }),
})
