import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { ShoppingCart } from "../../../../models/shoppingCart";
import { IShoppingCart } from "../../../../models/shoppingCart";
import { User } from "../../../../models/users";

//DELETE method for removing a product from the shopping cart using id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  try {
    const id = params.id;
    const shoppingCart = await ShoppingCart.findByIdAndDelete(id);
    if (!shoppingCart) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: `Product removed from the shopping cart` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error removing from the database` },
      { status: 500 }
    );
  }
}

//PUT method to change the quantity of a product in the shopping cart using id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  try {
    const updatedShoppingCartData: IShoppingCart = await request.json();
    const id = params.id;
    const shoppingCart = await ShoppingCart.findByIdAndUpdate(
      id,
      updatedShoppingCartData,
      {
        new: true,
      }
    );
    if (!shoppingCart) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: `Product Quantity Updated in the shopping cart` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating the database` },
      { status: 500 }
    );
  }
}

//GET method for fetching all products in the shopping cart for a specific user using userID and try catch
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  try {
    const id = params.id;
    const shoppingCart: IShoppingCart[] = await ShoppingCart.find({
      userID: id,
    });
    return NextResponse.json({ shoppingCart });
  } catch (error) {
    return NextResponse.json(
      { message: `Error fetching from the database` },
      { status: 500 }
    );
  }
}
