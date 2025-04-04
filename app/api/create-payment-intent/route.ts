// External Libraries
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
// Service Layer
import { redis } from '@/lib/config/upstash-config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  try {
    const { amount, sessionId } = await req.json();

    const idempotencyKey = uuidv4(); 

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });

  try {
    await redis.set(`order:${idempotencyKey}`, sessionId, {
      ex: 24 * 3600,
    });
  } catch (error) {
    console.error("Redis error:", error);
  }

  return NextResponse.json({ 
    clientSecret: paymentIntent.client_secret, 
    paymentIntentId: paymentIntent.id,
    idempotencyKey
  });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 });
  }
}