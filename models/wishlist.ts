import { Schema, Types, model, Document, models } from "mongoose";

interface IWishlist extends Document{
    userID: Types.ObjectId;
    productID: string;
    }

const wishlistSchema = new Schema<IWishlist>({
    userID: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
    productID: {
        type: String,
        required: true,
    },
});

const Wishlist = models.Wishlist ||  model<IWishlist>("Wishlist", wishlistSchema);

export {Wishlist};
export type {IWishlist};