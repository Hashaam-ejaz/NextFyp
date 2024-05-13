import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { SellerReport } from "../../../models/sellerReport";
import { ISellerReport } from "../../../models/sellerReport";
import { User } from "../../../models/users";


// POST method for creating a new report using try catch and also check the user exists
export async function POST(request: NextRequest) {
    try {
      await connectMongoDB();
        const report = new SellerReport(await request.json());
        //check if userID exists in the User collection
        const user = await User.findById(report.userID);
        if (!user) {
            return NextResponse.json(
              { message: "User Does Not Exist" },
              { status: 404 }
            );
          }
        await report.save(); // Use Mongoose's built-in save() method
        return NextResponse.json(
          { message: `Report created` },
          { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
          { message: `Error creating the report` },
          { status: 500 }
        );
    }
}

//GET method for fetching all reports
export async function GET() {
  await connectMongoDB();
    const reports: ISellerReport[] = await SellerReport.find();
    return NextResponse.json({ reports });
}
