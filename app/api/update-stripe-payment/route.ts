// External Libraries
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    const { payment_intent_id, shipping_option, amount } = await req.json();

    if (!payment_intent_id) {
        return NextResponse.json(
            { error: 'Missing payment_intent_id' },
            { status: 400 }
        );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-02-24.acacia',
    });

    try {
        const updateData: Stripe.PaymentIntentUpdateParams = {
            amount: amount + (shipping_option ? shipping_option.fixed_amount.amount : 0),
        };

        if (shipping_option) {
            updateData.metadata = {
                shipping_id: shipping_option.id,
            };
        }

        const paymentUpdate = await stripe.paymentIntents.update(
            payment_intent_id,
            updateData
        );

        return NextResponse.json(paymentUpdate, { status: 200 });
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}