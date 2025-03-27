// External Libraries
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {

    let { payment_intent } = await req.json();

    if (Array.isArray(payment_intent)) {
        payment_intent = payment_intent[0];
    }

    if (!payment_intent) {

        return NextResponse.json(
            { error: 'Payment intent ID is required' },
            { status: 400 }
        );
    }

    try {
        const paymentStatus = await stripe.paymentIntents.retrieve(payment_intent);

        return NextResponse.json(
            paymentStatus,
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving payment intent:', error);

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}