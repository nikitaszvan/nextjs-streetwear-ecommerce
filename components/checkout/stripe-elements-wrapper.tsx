"use client"

// Presentation Layer
import CheckoutForm from "@/components/checkout/checkout-form";

// Context
import { useCart } from "@/context/cart-context";

// External Libraries
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const StripeElementsWrapper = ({ paymentId, clientSecret, idempotencyKey }: { paymentId: string | undefined, clientSecret: string | undefined, idempotencyKey: string | undefined}) => {
    const { cart: { totalCartPrice } } = useCart();

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
                    <CheckoutForm amount={totalCartPrice} paymentId={ paymentId } clientSecret={ clientSecret } idempotencyKey={ idempotencyKey }/>
                </Elements>
            }
        </div>
    );
}

export default StripeElementsWrapper;