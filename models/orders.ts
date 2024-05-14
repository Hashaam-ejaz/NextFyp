import { Schema, model, Types, models } from "mongoose";

interface IOrder extends Document {
  buyerID: Types.ObjectId;
  buyerName: string;
  productID: string[];
  amount: number;
  quantity: number;
  paymentStatus: string;
  address: string;
  phoneNo?: string;
  date: Date;
  trackingNo?: string;
}

const orderSchema = new Schema<IOrder>({
  buyerID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
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
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  trackingNo: {
    type: String,
    required: false,
  },
});

const Order = models.Order || model<IOrder>("Order", orderSchema);

export { Order };
export type { IOrder };
