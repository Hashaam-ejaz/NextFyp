import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { ShoppingCart } from "../../../../models/shoppingCart";
import { IShoppingCart } from "../../../../models/shoppingCart";
import { User } from "../../../../models/users";

// await connectMongoDB();

//DELETE method for removing a product from the shopping cart using id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userID = params.id;

        if (userID) {
            // Delete all shopping carts by userID
            const deletedShoppingCarts = await ShoppingCart.deleteMany({ userID });
            if (deletedShoppingCarts.deletedCount > 0) {
                return NextResponse.json(
                    { message: `All shopping carts removed for userID: ${userID}` },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { message: `No shopping carts found for userID: ${userID}` },
                    { status: 404 }
                );
            }
        }  else {
            return NextResponse.json(
                { message: `Invalid request: Missing userID or ID parameter` },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error removing from the database:", error);
        return NextResponse.json(
            { message: `Error removing from the database` },
            { status: 500 }
        );
    }
}


//PUT method to change the quantity of a product in the shopping cart using id
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        const updatedShoppingCartData: IShoppingCart = await request.json();
        const id = params.id;
        const shoppingCart = await ShoppingCart.findByIdAndUpdate(id, updatedShoppingCartData, {
            new: true,
        });
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
    }
    catch (error) {
        return NextResponse.json(
          { message: `Error updating the database` },
          { status: 500 }
        );
    }
}

//GET method for fetching all products in the shopping cart for a specific user using userID and try catch
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const shoppingCart: IShoppingCart[] = await ShoppingCart.find({ userID: id });
        return NextResponse.json({ shoppingCart });
    }
    catch (error) {
        return NextResponse.json(
          { message: `Error fetching from the database` },
          { status: 500 }
        );
    }
}
