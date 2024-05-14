import { NextResponse, NextRequest } from "next/server";

import connectMongoDB from "../../../../libs/mongodb";
import { Product } from "../../../../models/products";
import { IProduct } from "../../../../models/products";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const id = params.id;
  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ existingProduct });
  } catch (error) {
    // Handle errors, e.g., database error
    return NextResponse.json(
      { message: "Error retrieving product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const updatedProductData: IProduct = await request.json();
  const id = params.id;
  await connectMongoDB();
  try {
    const product = await Product.findByIdAndUpdate(id, updatedProductData, {
      new: true,
    });
    return NextResponse.json({ message: "Product updated", product });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating Product" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const id = params.id;
  await connectMongoDB();
  try {
    const product: IProduct | null = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Product deleted", product });
  } catch (error) {
    // Handle errors, e.g., database error
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 }
    );
  }
}
