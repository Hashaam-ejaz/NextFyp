import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import { ReviewsHistory } from "../../../../models/reviewsHistory";
import { IReviewsHistory } from "../../../../models/reviewsHistory";
import { User } from "../../../../models/users";

await connectMongoDB();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;
    try {
      const review: IReviewsHistory | null = await ReviewsHistory.findById(id);  //find review by id 
      if (!review) {
        return NextResponse.json(
          { message: "Review not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ review });
      } catch (error) {
      // Handle errors, e.g., database error
      return NextResponse.json(
        { message: "Error retrieving review" },
        { status: 500 }
      );
      }
  }

  //PUT method for updating a review
    export async function PUT(
        request: NextRequest,
        { params }: { params: { id: string } }
    ) {
        const updatedReviewData: IReviewsHistory = await request.json();
        const id = params.id;
        try {
        const review = await ReviewsHistory.findByIdAndUpdate(id, updatedReviewData, {
            new: true,
        });
        return NextResponse.json({ message: "Review updated", review });
        } catch (error) {
        return NextResponse.json(
            { message: "Error updating Review" },
            { status: 400 }
        );
        }
    }

    //Delete method for deleting a review
    export async function DELETE(
        request: NextRequest,
        { params }: { params: { id: string } }
    ) {
        const id = params.id;
        try {
        const review: IReviewsHistory | null = await ReviewsHistory.findByIdAndDelete(id);
        if (!review) {
            return NextResponse.json(
            { message: "Review not found" },
            { status: 404 }
            );
        }
        return NextResponse.json({ message: "Review deleted" });
        } catch (error) {
        return NextResponse.json(
            { message: "Error deleting Review" },
            { status: 400 }
        );
        }
    }