import { NextResponse, NextRequest } from "next/server";

import connectMongoDB from "../../../libs/mongodb";
import { Product } from "../../../models/products";
import { IProduct } from "../../../models/products";

export async function POST(request: NextRequest) {
  await connectMongoDB();
  await connectMongoDB();
  const productData = new Product(await request.json());
  const { name } = productData;
  await productData.save(); // Use Mongoose's built-in save() method
  return NextResponse.json(
    { message: `Product ${name} added to database` },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  await connectMongoDB();
  await connectMongoDB();
  const products: IProduct[] = await Product.find();
  return NextResponse.json({ products });
}
