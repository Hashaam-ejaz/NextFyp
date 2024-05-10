import { Schema, Types, model, Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  discount?: string;
  variation?: string[];
  color: string[];
  imageLink: string;
  description: string;
  reviews: string[];
  rating: number;
  weight: number;
  quantity: number;
  sellerId: string;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
  },
  variation: {
    type: [String],
  },
  color: {
    type: [String],
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);

export { Product };
export type { IProduct };
