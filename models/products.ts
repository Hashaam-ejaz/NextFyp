import { Schema, Types, model, Document, models } from "mongoose";

interface IProduct {
  _id: any;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  discount?: number;
  size?: string[];
  color?: string[];
  description: string;
  reviews: {
    rating: number;
    date: string;
    userID: string;
    reviewDescription: string;
    images?: {
      src: string;
      alt: string;
    }[];
  }[];
  noReviews?: number;
  avgRating: number;
  weight: string;
  quantity: number;
  sellerId: string;
  sku: string;
  status: boolean; //calculated from quantity
  images: {
    src: string;
    alt: string;
  }[];
  noSales: number;
  featured: boolean;
  barcode: number;
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
  subCategory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  size: {
    type: [String],
    required: false,
  },
  color: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [
    {
      rating: { type: Number, required: true },
      date: { type: String, required: true },
      userID: { type: String, required: true },
      reviewDescription: { type: String, required: true },
      images: [
        {
          src: { type: String, required: false },
          alt: { type: String, required: false },
        },
      ],
    },
  ],
  avgRating: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
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
  sku: {
    type: String,
    required: true,
  },
  noReviews: {
    type: Number,
    required: false,
  },
  status: {
    type: Boolean,
    required: true,
  },
  images: [
    {
      src: { type: String, required: true },
      alt: { type: String, required: true },
    },
  ],
  noSales: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    required: false,
  },
  barcode: {
    type: Number,
    required: true,
  },
});
productSchema.index({ name: "text", description: "text" });

const Product = models.Product || model<IProduct>("Product", productSchema);

export { Product };
export type { IProduct };
