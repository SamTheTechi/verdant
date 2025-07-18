import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Indoor', 'Outdoor'],
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: [{ type: String }],
});

export default model('product', ProductSchema);
