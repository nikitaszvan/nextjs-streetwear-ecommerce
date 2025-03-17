import { NextRequest, NextResponse } from 'next/server';

import Stripe from 'stripe';


export async function POST(req: NextRequest) {
    const { payment_intent_id, shipping_option, amount } = await req.json();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-02-24.acacia',
    });

    try {
        const paymentUpdate = await stripe.paymentIntents.update(
            payment_intent_id,
            {
                amount: amount + shipping_option.fixed_amount.amount
            }
        );

        return NextResponse.json(
            paymentUpdate,
            { status: 200 }
        );
    } catch (err) {
        console.error(err)

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}