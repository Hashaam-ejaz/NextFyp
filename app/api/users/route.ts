import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../../../libs/mongodb";
import { User } from "../../../models/users";
import { IUser } from "../../../models/users";

const mongoClient = await connectMongoDB();

export async function POST(request: NextRequest) {
  const userData = new User(await request.json());
  const { name } = userData;
  await userData.save(); // Use Mongoose's built-in save() method
  return NextResponse.json(
    { message: `User ${name} created` },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  const users: IUser[] = await User.find();
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  if (email) {
    const decodedEmail = decodeURIComponent(email);
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ existingUser }, { status: 202 });
    }
    return NextResponse.json({ existingUser }, { status: 400 });
  }

  return NextResponse.json({ users });
}

export async function GET_EXISTS(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // const { email, phone } = query;

  console.log("Search Params:  " + searchParams);
  // try {
  //   if (!email || !phone) {
  //     return NextResponse.json(
  //       { error: "Email and phone number are required" },
  //       { status: 400 }
  //     );
  //   }

  //   const existingUser = await User.findOne({ email, phone });
  //   return NextResponse.json({ exists: !!existingUser }); // Return boolean indicating existence
  // } catch (error) {
  //   console.error("Error checking for user existence:", error);
  //   return NextResponse.json(
  //     { error: "Failed to check for user" },
  //     { status: 500 }
  //   );
  // }
}
