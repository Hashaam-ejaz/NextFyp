import { NextResponse, NextRequest } from "next/server";

import connectMongoDB from "../../../libs/mongodb";
import { Product, IProduct } from "../../../models/products";

type ProductFilter = {
  subCategory?: string;
  $text?: { $search: string; $caseSensitive?: boolean };
};

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const productData = new Product(await request.json());
  const { name } = productData;
  await productData.save(); // Use Mongoose's built-in save() method
  return NextResponse.json(
    { message: `Product ${name} added to database` },
    { status: 201 }
  );
}

function getTextBetweenEqualsSigns(text: string) {
  const firstEqualsIndex = text.indexOf("=");
  if (firstEqualsIndex === -1) {
    return null; // No "=" sign found
  }

  const secondEqualsIndex = text.indexOf("=", firstEqualsIndex + 1);
  return secondEqualsIndex === -1
    ? text.slice(firstEqualsIndex + 1) // No second "="
    : text.slice(firstEqualsIndex + 1, secondEqualsIndex);
}

function urlContainsText(url: string) {
  url; // Decode the URL in case it's encoded
  return url.indexOf("categoryName") !== -1;
}

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  let categoryName = decodeURIComponent(
    getTextBetweenEqualsSigns(request.url) as string
  );
  if (categoryName.endsWith("&query")) {
    categoryName = categoryName.slice(0, categoryName.length - 6);
  }
  let filter: ProductFilter = {};
  if (!urlContainsText(request.url)) {
    categoryName = "";
  }
  if (categoryName) {
    filter.subCategory = categoryName;
  }
  if (query) {
    filter.$text = { $search: query, $caseSensitive: false };
  }
  const products: IProduct[] = await Product.find(filter);
  return NextResponse.json({ products });
}
