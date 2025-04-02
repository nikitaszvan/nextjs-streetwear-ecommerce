// External Libraries
import { FormEvent } from "react";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Types
//

type HandlePayParams = {
    e: FormEvent<HTMLFormElement>;
    stripe: Stripe | null;
    elements: StripeElements | null;
    paymentIntentId: { clientSecret: string; idempotencyKey: string } | null;
    cartShippingOption: any;
    setLoading: (loading: boolean) => void;
    setErrorMessage: (error: { message: string | undefined }) => void;
    router: AppRouterInstance
};

export const handleStripePay = async ({
    e,
    stripe,
    elements,
    paymentIntentId,
    cartShippingOption,
    setLoading,
    setErrorMessage,
    router
}: HandlePayParams) => {
    e.preventDefault();
    if (!cartShippingOption) {
        setErrorMessage({ message: "Shipping option must be selected" });
        return;
    }
    setLoading(true);

    const getUrl = window.location;
    const baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

    if (!stripe || !elements) {
        setErrorMessage({ message: 'Stripe is not initialized.' });
        setLoading(false);
        return;
    }

    try {
        await elements.submit();
    } catch (error) {
        console.error('Error submitting elements:', error);

        if (error instanceof Error) {
            setErrorMessage({ message: `Submission failed: ${error.message}` });
        } else {
            setErrorMessage({ message: 'An unexpected error occurred during submission.' });
        }
        setErrorMessage({ message: 'An error occurred while submitting the payment. Please try again.' });
    }

    try {
        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            clientSecret: paymentIntentId!.clientSecret,
            confirmParams: {
                return_url: `${baseUrl}?idempotency_key=${paymentIntentId?.idempotencyKey}`,
            },
            redirect: 'if_required',
        });

        if (paymentIntent && (paymentIntent.status === 'succeeded')) {
            router.push(`${baseUrl}?idempotency_key=${paymentIntentId?.idempotencyKey}&payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`);
        } else if (error) {
            setErrorMessage({ message: error.message });
        }
    } catch (err) {
        setErrorMessage({ message: 'An unexpected error occurred. Please try again.' });
    }

    setLoading(false);
}