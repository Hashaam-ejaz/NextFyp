import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { price, quantity } = await req.json();
        console.log(price, quantity);
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1PLUmz01vLXq23BYBGteJkPN",
            quantity: quantity,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/checkout/?success=true`,
        cancel_url: `http://localhost:3000/checkout/?canceled=true`,
      });
      return NextResponse.json( redirect(session.url, 303));
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Internal server error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
  } 
