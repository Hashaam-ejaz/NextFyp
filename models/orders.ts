import { Schema, model, Types, Document, models } from "mongoose";

interface IProduct {
  productID: Types.ObjectId;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

interface IOrder {
  buyerID: Types.ObjectId;
  buyerName: string;
  products: IProduct[];
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  address: string;
  phoneNo?: string;
  date: Date;
  estimatedDelivery: Date;
  trackingNo?: string;
  trackingLink?: string;
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
  products: [
    {
      productID: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  orderStatus: {
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
  estimatedDelivery: {
    type: Date,
    required: true,
  },
  trackingNo: {
    type: String,
    required: false,
  },
  trackingLink: {
    type: String,
    required: false,
  },
});

const Order = models.Order || model<IOrder>("Order", orderSchema);

export { Order };
export type { IProduct };
export type { IOrder };
