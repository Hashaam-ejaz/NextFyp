import { NextResponse, NextRequest } from "next/server";

import connectMongoDB from "../../../libs/mongodb";
import {Wishlist} from "../../../models/wishlist";
import {IWishlist} from "../../../models/wishlist";


//create POST method using try-catch block
export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const wishlistData = new Wishlist(await request.json());
    const { userID, productID } = wishlistData;
    await wishlistData.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Product ${productID} added to wishlist for user ${userID}` },
      { status: 201 }
    );
  }
    catch (error) {
        return NextResponse.json(
        { message: `Error adding product to wishlist: ${error}` },
        { status: 500 }
        );
    }
}

//create GET method using try-catch block for a specific user by his userID
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const userID = request.nextUrl.searchParams.get("userID");
    const wishlist: IWishlist[] | null = await Wishlist.find({userID});
    return NextResponse.json({ wishlist }, { status: 200 });
  }
    catch (error) {
        return NextResponse.json(
        { message: `Error fetching wishlist: ${error}` },
        { status: 500 }
        );
    }
}