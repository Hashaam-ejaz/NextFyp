import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { User } from "../../../models/users";
import { Categories, ICategories } from "@/models/categories";

// POST method for creating a category
export async function POST(request: NextRequest) {
  await connectMongoDB();
  try {
    const newCategory = await request.json(); // Get the entire request body

    // Create a new Categories instance with the received data
    const category = new Categories(newCategory);

    // Use Mongoose's built-in save() method to save the category
    await category.save();

    return NextResponse.json({ message: `Category Created` }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error creating the category` },
      { status: 500 }
    );
  }
}

// GET method for fetching all categories
export async function GET() {
  await connectMongoDB();
  const categories: ICategories[] = await Categories.find();
  return NextResponse.json({ categories });
}
