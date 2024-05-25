import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import { Order } from "../../../../../models/orders";
import { IOrder } from "../../../../../models/orders";



// GET method for fetching an order by tracking number
export async function GET(
    request: NextRequest,
    { params }: { params: { trackingNo: string } }
  ) {
    await connectMongoDB();
    const trackingNo = params.trackingNo;
    try {
      const order: IOrder | null = await Order.findOne({ trackingNo: trackingNo });
      if (!order) {
        return NextResponse.json({ message: "Order not found" }, { status: 404 });
      }
      return NextResponse.json({ order });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching Order" },
        { status: 400 }
      );
    }
  }
  
