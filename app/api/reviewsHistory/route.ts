import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import { ReviewsHistory } from "../../../models/reviewsHistory";
import { IReviewsHistory } from "../../../models/reviewsHistory";
import { User } from "../../../models/users";

await connectMongoDB();

export async function POST(request: NextRequest) {
    const reviewData = new ReviewsHistory(await request.json());
    //check if userID exists in the User collection
    const user = await User.findById(reviewData.userID);
    if (!user) {
        return NextResponse.json(
          { message: "User Does Not Exist" },
          { status: 404 }
        );
      }
    await reviewData.save(); // Use Mongoose's built-in save() method
    return NextResponse.json(
      { message: `Review added to the Database` },
      { status: 201 }
    );
  }

  //GET method for fetching all reviews
    export async function GET() {
        const reviews: IReviewsHistory[] = await ReviewsHistory.find();
        return NextResponse.json({ reviews });
    }