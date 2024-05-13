import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { OrderHistory } from "../../../models/orderHistory";
import { IOrderHistory } from "../../../models/orderHistory";
import { User } from "../../../models/users";
import { Order } from "../../../models/orders";

export async function POST(request: NextRequest) {
  await connectMongoDB();
  try {
    const orderHistoryData = new OrderHistory(await request.json());
    if (
      !orderHistoryData.userID ||
      !orderHistoryData.orderID ||
      !orderHistoryData.orderDate
    ) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }
    //check if userID exists in the User collection
    const user = await User.findById(orderHistoryData.userID);
    if (!user) {
      return NextResponse.json(
        { message: "User Does Not Exist" },
        { status: 404 }
      );
    }
    //check if orderId exists in the Orders collection
    const order = await Order.findById(orderHistoryData.orderID);
    if (!order) {
      return NextResponse.json(
        { message: "Order Does Not Exist" },
        { status: 404 }
      );
    }
    // Check if the provided userID matches the userID associated with the order
    if (order.buyerID.toString() !== orderHistoryData.userID.toString()) {
      return NextResponse.json(
        { message: "User ID does not match the order's user ID" },
        { status: 400 }
      );
    }
    //check if the orderID already exists in the OrderHistory collection
    const orderExists = await OrderHistory.findOne({
      orderID: orderHistoryData.orderID,
    });
    if (orderExists) {
      return NextResponse.json(
        { message: "Order already exists in Order History" },
        { status: 400 }
      );
    }
    const { userID } = orderHistoryData;
    await orderHistoryData.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Order for ID:${userID} added to Order History` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order history:", error);
    return NextResponse.json(
      { message: "Error creating Order History" },
      { status: 400 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const orderHistory: IOrderHistory[] = await OrderHistory.find();
  return NextResponse.json({ orderHistory });
}
