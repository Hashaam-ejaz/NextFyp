import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongoDB from "../../../../libs/mongodb";
import { User, IUser } from "../../../../models/users";
import bcrypt from "bcryptjs";



export async function PUT (
    request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();
        const id  = params.id;
        const updatedUserData: IUser =  await request.json();
        const user = await User.findByIdAndUpdate(id, updatedUserData, {
            new: true,
        });
        if (!user) {
            return NextResponse.json(
                { message: "User Not Found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "User Data Updated" },
            { status: 200 });
}
catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
        { message: `Error updating user` },
        { status: 500 }
    );
}
}

