import { NextResponse, NextRequest } from "next/server";

import connectMongoDB from "../../../../../libs/mongodb";
import { Product } from "../../../../../models/products";

export async function GET(
    request: NextRequest,
    { params }: { params: { sku: string } }) 
    {
    await connectMongoDB();
    
    const sku = params.sku;
  
    if (!sku) {
      return NextResponse.json(
        { message: "Product SKU is required" },
        { status: 400 }
      );
    }
  
    try {
      const products = await Product.find({ sku: sku });
      return NextResponse.json({ products });
    } catch (error) {
      return NextResponse.json(
        { message: "Error retrieving products" },
        { status: 500 }
      );
    }
  }