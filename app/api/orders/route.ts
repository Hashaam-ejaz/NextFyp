import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { Order } from "../../../models/orders";
import { IOrder } from "../../../models/orders";
import { User } from "../../../models/users";


export async function POST(request: NextRequest) {
  await connectMongoDB();
    const orderData = new Order(await request.json());
    const { buyerName } = orderData;
    if (!buyerName) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }
    //check if userID exists in the User collection
    const user = await User.findById(orderData.buyerID);
    if (!user) {
        return NextResponse.json(
          { message: "User Does Not Exist" },
          { status: 404 }
        );
      }
    await orderData.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Order for ${buyerName} added to the Orders` },
      { status: 201 }
    );
  }

  export async function GET(request: NextRequest) {
    await connectMongoDB();
    const searchParams = request.nextUrl.searchParams;
    const buyerID = searchParams.get("buyerID");
    const PaymentStatus = searchParams.get("paymentStatus");

    if (buyerID && PaymentStatus) {
      const existingOrder: IOrder | null = await Order.findOne({
        buyerID: buyerID,
        paymentStatus: PaymentStatus,
    })
    if (existingOrder) {
      return NextResponse.json({ existingOrder }, { status: 202 });
    }
    return NextResponse.json({ existingOrder }, { status: 300 });
    }


    const orders: IOrder[] = await Order.find();
    return NextResponse.json({ orders });
  }