import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { ShoppingCart } from "../../../models/shoppingCart";
import { IShoppingCart } from "../../../models/shoppingCart";
import { User } from "../../../models/users";
import { Product } from "../../../models/products";

// POST method for adding a product to the shopping cart using try catch
export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const shoppingCart = new ShoppingCart(await request.json());
    //check if userID exists in the User collection
    const user = await User.findById(shoppingCart.userID);
    if (!user) {
      return NextResponse.json(
        { message: "User Does Not Exist" },
        { status: 404 }
      );
    }
    //check if productsID exists in the Product collection
    const product = await Product.findById(shoppingCart.productID);
    if (!product) {
      return NextResponse.json(
        { message: "Product Does Not Exist" },
        { status: 404 }
      );
    }
    await shoppingCart.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Product added to the shopping cart` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error adding to the database` },
      { status: 500 }
    );
  }
}

//GET method for fetching all products in the shopping cart
export async function GET() {
  await connectMongoDB();
  const shoppingCart: IShoppingCart[] = await ShoppingCart.find();
  return NextResponse.json({ shoppingCart });
}
