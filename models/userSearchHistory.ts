import { Schema, model, Types, models } from "mongoose";

interface IUserSearchHistory extends Document {
  userID: Types.ObjectId;
  productsID: Types.ObjectId[];
  date: Date;
  searchQuery: string;
}

const UserSearchHistorySchema = new Schema<IUserSearchHistory>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productsID: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  searchQuery: {
    type: String,
    required: true,
  },
});

const UserSearchHistory =
  models.UserSearchHistory ||
  model<IUserSearchHistory>("UserSearchHistory", UserSearchHistorySchema);

export { UserSearchHistory };
export type { IUserSearchHistory };
