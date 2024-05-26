import { NextResponse, NextRequest } from "next/server";

import connectMongoDB from "../../../../../libs/mongodb";
import { Product } from "../../../../../models/products";
import { IProduct } from "../../../../../models/products";

export async function GET(
    request: NextRequest,
    { params }: { params: { sellerId: string } }) 
    {
    await connectMongoDB();
    
    const sellerId = params.sellerId;
  
    if (!sellerId) {
      return NextResponse.json(
        { message: "Seller ID is required" },
        { status: 400 }
      );
    }
  
    try {
      const products = await Product.find({ sellerId: sellerId });
      return NextResponse.json({ products });
    } catch (error) {
      return NextResponse.json(
        { message: "Error retrieving products" },
        { status: 500 }
      );
    }
  }