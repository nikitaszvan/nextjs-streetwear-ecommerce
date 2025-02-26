"use client"

import CheckoutForm from "@/components/layout/checkout-form";
import { CheckoutProvider, Elements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from "@/context/cart-context";

const StripeElementsWrapper = () => {
    const { cart: { totalCartPrice } } = useCart();

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    const amount = totalCartPrice || 1200;

    return (
        <div className="my-8 max-w-[65ch] xl:col-span-5">
            <section className="max-w-md">
                <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below.</p>
            </section>
            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: Math.round(amount * 100),
                    currency: "cad"
                }}
            >
                <CheckoutForm amount={amount} />
            </Elements>
        </div>
    );
}

export default StripeElementsWrapper;