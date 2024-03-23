export interface UserI {
  name: string; // Required
  email: string; // Required, unique
  password: string; // Required
  address?: string; // Optional
  role: string; // Required
  phone: number; // Required, unique
  wishlist?: string[]; // Optional array of strings (wishlist item IDs or descriptions)
}
