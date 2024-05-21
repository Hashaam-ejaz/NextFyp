import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { BankInfo } from "../../../models/bankInfo";
import { IBankInfo } from "../../../models/bankInfo";
import { User } from "../../../models/users";


//make a Post request to add bank info using try catch
export async function POST(request: NextRequest) {
    await connectMongoDB();
    const bankInfoData = new BankInfo(await request.json());
    const { shopName } = bankInfoData;
    if (!shopName) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }
    //check if userID exists in the User collection
    const user = await User.findById(bankInfoData.userID);
    if (!user) {
        return NextResponse.json(
          { message: "User Does Not Exist" },
          { status: 404 }
        );
      }
    await bankInfoData.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Bank Info for ${shopName} added to the Bank Info` },
      { status: 201 }
    );
  }

    //make a Get request to get all bank info using try catch
    export async function GET(request: NextRequest) {
        await connectMongoDB();
        const bankInfos: IBankInfo[] = await BankInfo.find();
        return NextResponse.json({ bankInfos });
      }




