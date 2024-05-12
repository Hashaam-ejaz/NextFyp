import { Schema, Types, model, models } from "mongoose";

interface IWishlist {
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

const Wishlist = models.Wishlist || model<IWishlist>("Wishlist", wishlistSchema);

export {Wishlist};
export type {IWishlist};