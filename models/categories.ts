import { Schema, model, models } from "mongoose";

interface ISubCategory {
  name: string;
}

interface ICategories {
  category: string; // Renamed for clarity
  subCategories: ISubCategory[];
}

const categoriesSchema = new Schema<ICategories>({
  category: {
    type: String,
    required: true,
  },
  subCategories: {
    type: [new Schema({ name: { type: String, required: true } })],
    required: true,
  },
});

const Categories =
  models.Categories || model<ICategories>("Categories", categoriesSchema);

export { Categories };
export type { ICategories };

// const abc = {
//   Electronics: {
//     subCategories: [
//       { name: "Computers & Tablets" },
//       { name: "Cell Phones & Accessories" },
//       { name: "TVs, Video & Audio" },
//       { name: "Camera & Photo" },
//     ],
//   },
//   "Home & Kitchen": {
//     subCategories: [
//       { name: "Small Appliances" },
//       { name: "Kitchen Appliances" },
//       { name: "Furniture" },
//       { name: "Bath" },
//     ],
//   },
//   Fashion: {
//     subCategories: [
//       { name: "Men's Fashion" },
//       { name: "Women's Fashion" },
//       { name: "Kids' Fashion" },
//       { name: "Shoes" },
//     ],
//   },
//   "Beauty & Health": {
//     subCategories: [
//       { name: "Makeup" },
//       { name: "Skin Care" },
//       { name: "Fragrances" },
//       { name: "Vitamins & Supplements" },
//     ],
//   },
//   "Sports & Outdoors": {
//     subCategories: [
//       { name: "Athletic Apparel" },
//       { name: "Sporting Goods" },
//       { name: "Outdoor Gear" },
//       { name: "Fitness & Exercise" },
//     ],
//   },
//   Baby: {
//     subCategories: [
//       { name: "Baby Clothing" },
//       { name: "Diapering" },
//       { name: "Feeding" },
//       { name: "Toys & Playtime" },
//     ],
//   },
// };
