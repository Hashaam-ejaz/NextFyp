import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { Order } from "../../../../models/orders";
import { IOrder } from "../../../../models/orders";

//GET method for fetching all orders for a specific user using try catch
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const id = params.id;
  try {
    const orders: IOrder[] = await Order.find({ buyerID: id });
    return NextResponse.json({ orders });
  }
  catch (error) {
    return NextResponse.json(
      { message: "Error fetching Orders" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const updatedOrderData: IOrder = await request.json();
  const id = params.id;
  try {
    const order = await Order.findByIdAndUpdate(id, updatedOrderData, {
      new: true,
    });
    return NextResponse.json({ message: "Order updated", order });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating Order" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const id = params.id;
  try {
    const order: IOrder | null = await Order.findByIdAndDelete(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Order deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Order" },
      { status: 400 }
    );
  }
}
