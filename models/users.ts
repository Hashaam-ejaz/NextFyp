import mongoose, { Schema, model } from "mongoose";

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: false,
//   },
//   role: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   wishlist: {
//     type: Array,
//     required: false,
//   },
// });

// export default mongoose.models.User || mongoose.model("User", userSchema);

interface IUser {
  name: string;
  email: string;
  password: string;
  address?: string;
  role: string;
  phone: number;
  wishlist?: any[];
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
});
const User = model<IUser>("User", userSchema);

export { User };
export type { IUser };
