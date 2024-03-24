import { Schema, model, Types } from "mongoose";

interface IOrderHistory {
  userID: Types.ObjectId;
  orderID: Types.ObjectId;
  orderDate: Date;
}

const orderHistorySchema = new Schema<IOrderHistory>({
  userID: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  orderID: {
    type: Schema.Types.ObjectId, ref: 'Order',
    unique: true,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
});

const OrderHistory = model<IOrderHistory>("OrderHistory", orderHistorySchema);

export { OrderHistory };
export type { IOrderHistory };