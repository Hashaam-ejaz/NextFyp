import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { User } from "../../../../models/users";
import { IUser } from "../../../../models/users";

await connectMongoDB();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const emailLower = id.toLowerCase();
  try {
    const user: IUser | null = await User.findOne({
      email: emailLower,
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    // Handle errors, e.g., database error
    return NextResponse.json(
      { message: "Error retrieving user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const updatedUserData: IUser = await request.json();
  const id = params.id;
  try {
    const user = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });
    return NextResponse.json({ message: "User updated", user });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const user: IUser | null = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted", user });
  } catch (error) {
    // Handle errors, e.g., database error
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}
