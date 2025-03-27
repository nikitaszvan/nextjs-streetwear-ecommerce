// External Libraries
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {

    let { charge_id } = await req.json();

    if (!charge_id) {

        return NextResponse.json(
            { error: 'Payment intent ID is required' },
            { status: 400 }
        );
    }

    try {
        const chargeInfo = await stripe.charges.retrieve(charge_id);

        return NextResponse.json(
            chargeInfo,
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