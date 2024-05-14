import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { UserSearchHistory } from "../../../../models/userSearchHistory";
import { IUserSearchHistory } from "../../../../models/userSearchHistory";

//PUT method for updating a search history
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const updatedSearchHistoryData: IUserSearchHistory = await request.json();
  const id = params.id;
  try {
    const newSearchHistory = await UserSearchHistory.findByIdAndUpdate(
      id,
      updatedSearchHistoryData,
      {
        new: true,
      }
    );
    return NextResponse.json({
      message: "Search History updated",
      newSearchHistory,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating Search History" },
      { status: 400 }
    );
  }
}

//Delete method for deleting all search history for a specific user using try catch block and also check if the user exists
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const userID = params.id;
  try {
    const userSearchHistory = await UserSearchHistory.find({ userID });
    if (userSearchHistory.length === 0) {
      return NextResponse.json(
        { message: "No Search History found for the User" },
        { status: 404 }
      );
    }
    await UserSearchHistory.deleteMany({ userID });
    return NextResponse.json({
      message: "Search History for the given user has been deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting Search History" },
      { status: 500 }
    );
  }
}
//GET method for fetching all search history for a specific user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectMongoDB();
  const userID = params.id;
  try {
    const userSearchHistory: IUserSearchHistory[] =
      await UserSearchHistory.find({ userID });
    if (userSearchHistory.length === 0) {
      return NextResponse.json(
        { message: "No Search History found for the User" },
        { status: 404 }
      );
    }
    return NextResponse.json({ userSearchHistory });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving search history" },
      { status: 500 }
    );
  }
}
