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
