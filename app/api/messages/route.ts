import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { Messages } from "../../../models/messages";
import { IMessages } from "../../../models/messages";
import { User } from "../../../models/users";

await connectMongoDB();

// POST method for sending a message using try catch
export async function POST(request: NextRequest) {
    try {
        const message = new Messages(await request.json());
        //check if recipient exists in the User collection
        const recipient = await User.findById(message.recipient);
        if (!recipient) {
            return NextResponse.json(
              { message: "Recipient Does Not Exist" },
              { status: 404 }
            );
          }
        //check if sender exists in the User collection
        const sender = await User.findById(message.sender);
        if (!sender) {
            return NextResponse.json(
              { message: "Sender Does Not Exist" },
              { status: 404 }
            );
          }
        await message.save(); // Use Mongoose's built-in save() method
        return NextResponse.json(
          { message: `Message sent` },
          { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
          { message: `Error sending the message` },
          { status: 500 }
        );
    }
}

//GET method for fetching all messages
export async function GET() {
    const messages: IMessages[] = await Messages.find();
    return NextResponse.json({ messages });
}