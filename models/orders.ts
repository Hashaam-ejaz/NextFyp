import { Schema, model } from "mongoose";

interface IOrder {
  buyerID: string;
  buyerName: string;
  productID: string[];
  amount: number;
  quantity: number;
  paymentStatus: string;
  date: string;
  trackingNo?: string;
}

const orderSchema = new Schema<IOrder>({
  buyerID: {
    type: String,
    required: true,
  },
  buyerName: { 
    type: String, 
    required: true 
  },
  productID: {
    type: [String],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  trackingNo: {
    type: String,
    required: false,
  },
});

const Order = model<IOrder>("Order", orderSchema);

export { Order };
export type { IOrder };
