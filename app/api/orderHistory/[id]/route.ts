import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { OrderHistory } from "../../../../models/orderHistory";
import { IOrderHistory } from "../../../../models/orderHistory";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  await connectMongoDB();
  const id = params.id;
  try {
    const orderHistory: IOrderHistory | null = await OrderHistory.findById(id); //find orderHistory by id
    if (!orderHistory) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ orderHistory });
  } catch (error) {
    // Handle errors, e.g., database error
    return NextResponse.json(
      { message: "Error retrieving order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  await connectMongoDB();
  const id = params.id;
  try {
    const orderHistory: IOrderHistory | null =
      await OrderHistory.findByIdAndDelete(id);
    if (!orderHistory) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Order deleted", orderHistory });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Order" },
      { status: 400 }
    );
  }
}
