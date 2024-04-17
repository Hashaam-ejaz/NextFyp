import { Schema, model, Types } from "mongoose";

interface IReviewsHistory {
  userID: Types.ObjectId;
  productID: Types.ObjectId;
  review: string;
  rating: number;
}

const reviewsHistorySchema = new Schema<IReviewsHistory>({
  userID: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  productID: {
    type: Schema.Types.ObjectId, ref: 'Product',
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const ReviewsHistory = model<IReviewsHistory>("ReviewsHistory", reviewsHistorySchema);

export { ReviewsHistory };
export type { IReviewsHistory };