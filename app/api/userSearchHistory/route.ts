import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { UserSearchHistory } from "../../../models/userSearchHistory";
import { IUserSearchHistory } from "../../../models/userSearchHistory";
import { User } from "../../../models/users";

export async function POST(request: NextRequest) {
  await connectMongoDB();
  const searchHistory = new UserSearchHistory(await request.json());
  //check if userID exists in the User collection
  const user = await User.findById(searchHistory.userID);
  if (!user) {
    return NextResponse.json(
      { message: "User Does Not Exist" },
      { status: 404 }
    );
  }
  await searchHistory.save(); // Use Mongoose's built-in save() method
  return NextResponse.json(
    { message: `Search Query added to the Database` },
    { status: 201 }
  );
}

//GET method for fetching all search history
export async function GET() {
  await connectMongoDB();
  const searchHistory: IUserSearchHistory[] = await UserSearchHistory.find();
  return NextResponse.json({ searchHistory });
}
