
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
});

export async function GET() {

    try {
        const shippingRates = await stripe.shippingRates.list({
            limit: 10,
        });

        return NextResponse.json(
            shippingRates,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 })
    }
}