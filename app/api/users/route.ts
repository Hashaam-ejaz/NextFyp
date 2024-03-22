import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import User from "../../../models/users";

export async function POST(request: Request) {
  const userData = new User(await request.json());
  await connectMongoDB();
  await User.create(userData);
  return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function GET(request: Request) {
  await connectMongoDB();

  const users = await User.find();

  return NextResponse.json({ users });
}
