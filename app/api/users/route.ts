import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../../../libs/mongodb";
import { User, IUser } from "../../../models/users";
import bcrypt from "bcryptjs";

const mongoClient = await connectMongoDB();

export async function POST(request: NextRequest) {
  const userData = new User(await request.json());
  const { name, password } = userData;
  const hashedPassword: string = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
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
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ existingUser }, { status: 202 });
    }
    return NextResponse.json({ existingUser }, { status: 300 });
  }

  return NextResponse.json({ users });
}
