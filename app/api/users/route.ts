import { NextResponse, NextRequest } from "next/server";

import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/users";
import { UserI } from "./users";

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
  const users: UserI[] = await User.find();
  return NextResponse.json({ users });
}
