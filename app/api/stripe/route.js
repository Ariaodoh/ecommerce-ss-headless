import Stripe from 'stripe';
import { NextResponse } from 'next/server';

//Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        //Parse request body 
        const { checkoutItems } = await request.json();

        //create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            shipping_options: [
                { shipping_rate: 'shr_1QX1lBA15Ibc0uexupVGCcs4' },
            ],
            billing_address_collection: 'auto',
            shipping_address_collection: {
              allowed_countries: ['US', 'CA', 'GB'],
            },
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
            line_items: checkoutItems,
        });

        return NextResponse.json({ sessionId: session.id });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};