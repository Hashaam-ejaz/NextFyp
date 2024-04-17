import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { Messages } from "../../../../models/messages";
import { IMessages } from "../../../../models/messages";

await connectMongoDB();

//GET method for fetching all messages for a specific user using id and try catch
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const messages: IMessages[] = await Messages.find({ recipient: id });
        return NextResponse.json({ messages });
    } catch (error) {
        return NextResponse.json(
          { message: `Error fetching messages` },
          { status: 500 }
        );
    }
}

//DELETE method for deleting all messages using id and try catch
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await Messages.deleteMany({ recipient: id });
        return NextResponse.json(
          { message: `Messages deleted` },
          { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
          { message: `Error deleting messages` },
          { status: 500 }
        );
    }
}


