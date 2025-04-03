"use client"

import { useMemo } from "react";
import { useCart } from "@/context/cart-context";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./checkout-form";

type StripeElementsWrapperParams = {
    paymentId: string | undefined;
    clientSecret: string | undefined;
    idempotencyKey: string | undefined;
}

const StripeElementsWrapper = ({ paymentId, clientSecret, idempotencyKey }: StripeElementsWrapperParams) => {
    const { cart: { totalCartPrice } } = useCart();

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    console.log(stripePromise, process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    const memoizedProps = useMemo(() => ({
        paymentId,
        clientSecret,
        idempotencyKey
    }), [paymentId, clientSecret, idempotencyKey]);


    return (
        <div className="my-8 max-w-2xl lg:max-w-md lg:flex-1 w-full">
            <section className="max-w-md">
                <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below.</p>
            </section>
            {(totalCartPrice !== 0) &&
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: Math.round(totalCartPrice * 100),
                        currency: "cad"
                    }}
                >
                    <CheckoutForm
                        amount={totalCartPrice}
                        paymentId={memoizedProps.paymentId}
                        clientSecret={memoizedProps.clientSecret}
                        idempotencyKey={memoizedProps.idempotencyKey}
                    />
                </Elements>
            }
        </div>
    );
};

export default StripeElementsWrapper;
