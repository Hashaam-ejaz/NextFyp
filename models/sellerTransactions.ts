import { Schema, model, Types, models } from "mongoose";

interface ISellerTransactions {
  userID: Types.ObjectId;
  transactionID: number;
  orderID: Types.ObjectId;
  amount: number;
  buyerName: string;
  buyerPhone: string;
  date: Date;
  status: string;
}

const SellerTransactionsSchema = new Schema<ISellerTransactions>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transactionID: {
    type: Number,
    required: true,
  },
  orderID: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  buyerPhone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const SellerTransactions =
  models.SellerTransactions ||
  model<ISellerTransactions>("SellerTransactions", SellerTransactionsSchema);

export { SellerTransactions };
export type { ISellerTransactions };
