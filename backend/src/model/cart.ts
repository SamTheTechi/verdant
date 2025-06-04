import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    cart: [
      {
        productId: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          default: 1,
          min: 1,
        }
      }
    ]
  },
  { id: false }
);

export default model('cart', CartSchema);
