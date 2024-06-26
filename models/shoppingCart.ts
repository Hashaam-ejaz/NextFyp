import { Schema, model, Types, Document, models } from "mongoose";

interface IShoppingCart {
  userID: Types.ObjectId;
  productID: Types.ObjectId;
  quantity: number;
}

const ShoppingCartSchema = new Schema<IShoppingCart>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ShoppingCart = models.ShoppingCart || model<IShoppingCart>("ShoppingCart", ShoppingCartSchema);

export { ShoppingCart };
export type { IShoppingCart };
