import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { Order } from "../../../models/orders";
import { IOrder } from "../../../models/orders";

await connectMongoDB();

export async function POST(request: NextRequest) {
    const orderData = new Order(await request.json());
    const { buyerName } = orderData;
    await orderData.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Order for ${buyerName} added to database` },
      { status: 201 }
    );
  }

  export async function GET() {
    const orders: IOrder[] = await Order.find();
    return NextResponse.json({ orders });
  }