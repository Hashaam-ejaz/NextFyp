import { Schema, model, models, Document } from "mongoose";
interface IUser {
  name: string;
  email: string;
  password: string;
  address?: string;
  role: string;
  phone: number;
  wishlist?: any[];
  recom_id?: string;
  walletAddress: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  wishlist: {
    type: [Schema.Types.Mixed],
    required: false,
  },
  recom_id: {
    type: String,
    required: false,
  },
  walletAddress: {
    type: String,
    required: true,
  },
});
const User = models.User || model<IUser>("User", userSchema);

export { User };
export type { IUser };
