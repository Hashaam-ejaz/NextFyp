import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { SellerTransactions } from "../../../models/sellerTransactions";
import { ISellerTransactions } from "../../../models/sellerTransactions";
import { User } from "../../../models/users";
import { Order } from "../../../models/orders";

// POST method for creating a new transaction using try catch
export async function POST(request: NextRequest) {
  await connectMongoDB();
  try {
    const transaction = new SellerTransactions(await request.json());
    //check if userID exists in the User collection
    const user = await User.findById(transaction.userID);
    if (!user) {
      return NextResponse.json(
        { message: "User Does Not Exist" },
        { status: 404 }
      );
    }
    //check if orderID exists in the Order collection
    const order = await Order.findById(transaction.orderID);
    if (!order) {
      return NextResponse.json(
        { message: "Order Does Not Exist" },
        { status: 404 }
      );
    }
    await transaction.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Transaction created` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error creating the transaction` },
      { status: 500 }
    );
  }
}

//GET method for fetching all transactions
export async function GET() {
  await connectMongoDB();
  const transactions: ISellerTransactions[] = await SellerTransactions.find();
  return NextResponse.json({ transactions });
}
