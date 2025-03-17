"use client"

import CheckoutForm from "@/components/layout/checkout-form";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from "@/context/cart-context";

const StripeElementsWrapper = ({ paymentId, clientSecret }: { paymentId: string | undefined, clientSecret: string | undefined}) => {
    const { cart: { totalCartPrice, cartShippingOption } } = useCart();

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    let amount;

    if (cartShippingOption && cartShippingOption.fixed_amount.amount) {
        amount = totalCartPrice + cartShippingOption?.fixed_amount.amount/100;
    } else {
        amount = totalCartPrice;
    };


    return (
        <div className="my-8 max-w-[65ch] col-span-5">
            <section className="max-w-md">
                <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below.</p>
            </section>
            {amount &&
                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: Math.round(amount * 100),
                        currency: "cad"
                    }}
                >
                    <CheckoutForm amount={amount} paymentId={ paymentId } clientSecret={ clientSecret }/>
                </Elements>
            }
        </div>
    );
}

export default StripeElementsWrapper;