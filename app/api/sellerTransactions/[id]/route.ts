import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { SellerTransactions } from "../../../../models/sellerTransactions";
import { ISellerTransactions } from "../../../../models/sellerTransactions";
import { User } from "../../../../models/users";

//GET method for fetching all transactions for a specific user using id and try catch
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const id = params.id;
    //check if userID exists in the User collection
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { message: "User Does Not Exist" },
        { status: 404 }
      );
    }
    const transactions: ISellerTransactions[] = await SellerTransactions.find({
      userID: id,
    });
    return NextResponse.json({ transactions });
  } catch (error) {
    return NextResponse.json(
      { message: `Error fetching transactions` },
      { status: 500 }
    );
  }
}

//DELETE method for deleting all transactions using id and try catch
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const id = params.id;
    await SellerTransactions.deleteMany({ userID: id });
    return NextResponse.json(
      { message: `Transactions deleted` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error deleting transactions` },
      { status: 500 }
    );
  }
}

//PUT method for updating a transaction using id and try catch
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();
    const id = params.id;
    const transaction = await SellerTransactions.findById(id);
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction Does Not Exist" },
        { status: 404 }
      );
    }
    await SellerTransactions.findByIdAndUpdate(id, await request.json());
    return NextResponse.json(
      { message: `Transaction updated` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error updating the transaction` },
      { status: 500 }
    );
  }
}
