
// import Stripe from 'stripe';
// import { NextApiRequest, NextApiResponse } from 'next';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: '2025-02-24.acacia',
// });

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     const sig = req.headers['stripe-signature']!;

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret!);
//     } catch (err) {
//       console.error(`Webhook signature verification failed: ${(err as Error).message}`);
//       return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
//     }

//     let intent;
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         intent = event.data.object;
//         console.log('Succeeded:', intent.id);

//         break;
//       case 'payment_intent.payment_failed':
//         intent = event.data.object;
//         const message =
//           intent.last_payment_error && intent.last_payment_error.message;
//         console.log('Failed:', intent.id, message);

//         // Handle failed payment
//         // ... your code here ...

//         break;
//       default:
//         console.warn(`Unhandled event type: ${event.type}`);
//     }

//     res.status(200).json({ received: true, event: event }); // Send success response
// }

// pages/api/check-payment-status.js

import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
});


export async function POST(req: NextRequest, res: NextResponse) {

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
        // Retrieve the payment intent from Stripe
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