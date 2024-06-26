import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { BankInfo } from "../../../../models/bankInfo";
import { IBankInfo } from "../../../../models/bankInfo";
import { User } from "../../../../models/users";

//Make a GET Request to get a specific user's bank info using try catch
export async function GET(request: NextRequest,
    { params }: { params: { id: string } }) {
    await connectMongoDB();
    const userID = params.id;
    if (!userID) {
        return NextResponse.json(
            { message: "Please provide a userID" },
            { status: 400 }
        );
    }
    const bankInfo: IBankInfo | null = await BankInfo.findOne({ userID: userID });
    if (!bankInfo) {
        return NextResponse.json(
            { message: "Bank Info does not exist" },
            { status: 404 }
        );
    }
    return NextResponse.json({ bankInfo });
}

//Make a PUT Request to update a specific user's bank info using try catch
export async function PUT(request: NextRequest,
    { params }: { params: { id: string } }) {
    console.log("Inside PUT request");
    await connectMongoDB();
    const userID = params.id;
    console.log("userID", userID);
    if (!userID) {
        return NextResponse.json(
            { message: "Please provide a userID" },
            { status: 400 }
        );
    }
    const updatedBankInfo: IBankInfo = await request.json();
    const bankInfo: IBankInfo | null = await BankInfo.findOne   ({ userID: userID });
    if (!bankInfo) {
        return NextResponse.json(
            { message: "Bank Info does not exist" },
            { status: 404 }
        );
    }
    const updatedResponse= await BankInfo.findOneAndUpdate({ userID: userID }, updatedBankInfo, { new: true });
    return NextResponse.json(
        { message: "Bank Info updated successfully" },
        { status: 200 }
    );


}

//Make a DELETE Request to delete a specific user's bank info using try catch
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    await connectMongoDB();
    const userID = params.id;
    if (!userID) {
        return NextResponse.json(
            { message: "Please provide a userID" },
            { status: 400 }
        );
    }
    const bankInfo: IBankInfo | null = await BankInfo.findOne({ userID: userID });
    if (!bankInfo) {
        return NextResponse.json(
            { message: "Bank Info does not exist" },
            { status: 404 }
        );
    }
    await BankInfo.findOneAndDelete({ userID: userID });
    return NextResponse.json(
        { message: "Bank Info deleted successfully" },
        { status: 200 }
    );
}
