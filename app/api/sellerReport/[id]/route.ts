import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { SellerReport } from "../../../../models/sellerReport";
import { ISellerReport } from "../../../../models/sellerReport";
import { User } from "../../../../models/users";


//GET method for fetching all reports for a specific user using id and try catch
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
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
        const reports: ISellerReport[] = await SellerReport.find({ userID: id });
        return NextResponse.json({ reports });
    } catch (error) {
        return NextResponse.json(
          { message: `Error fetching reports` },
          { status: 500 }
        );
    }
}

//DELETE method for deleting all reports using id and try catch
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
      await connectMongoDB();
        const id = params.id;
        await SellerReport.deleteMany({ userID: id });
        return NextResponse.json(
          { message: `Reports deleted` },
          { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
          { message: `Error deleting reports` },
          { status: 500 }
        );
    }
}

//PUT method for updating a report using id and try catch
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
      await connectMongoDB();
        const id = params.id;
        const report = await SellerReport.findById(id);
        if (!report) {
            return NextResponse.json(
              { message: "Report Does Not Exist" },
              { status: 404 }
            );
          }
        await SellerReport.findByIdAndUpdate(id, await request.json());
        return NextResponse.json(
          { message: `Report updated` },
          { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
          { message: `Error updating the report` },
          { status: 500 }
        );
    }
}