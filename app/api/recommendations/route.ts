import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const { userid, productid } = await request.json();

        const externalResponse = await fetch("http://ec2-50-16-45-184.compute-1.amazonaws.com:5000/recommend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userid, productid }),
        });

        if (!externalResponse.ok) {
            throw new Error("Failed to fetch recommendations");
        }

        const data = await externalResponse.json();

        return NextResponse.json(
            { recommended_products: data.recommended_products },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return NextResponse.json(
            { message: "Error fetching recommendations." },
            { status: 500 }
        );
    }
}
