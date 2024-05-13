import { Schema, model, Types, models } from "mongoose";

interface ISellerReport {
  userID: Types.ObjectId;
  rating: number;
  noOfProductsSold: number;
  totalSalesAmount: number;
  balance: number;
  withdrawals: number;
}

const SellerReportSchema = new Schema<ISellerReport>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  noOfProductsSold: {
    type: Number,
    required: true,
  },
  totalSalesAmount: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  withdrawals: {
    type: Number,
    required: true,
  },
});

const SellerReport =
  models.SellerReport ||
  model<ISellerReport>("SellerReport", SellerReportSchema);

export { SellerReport };
export type { ISellerReport };
