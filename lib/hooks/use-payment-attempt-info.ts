// External Libraries
import { Dispatch, SetStateAction } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Types
import { ShippingOptionType } from '@/types/stripe-element-types';
import { CartProductType } from '@/types/cart-types';

type UsePaymentAttemptInfoParams = {
    paymentId: string | undefined;
    clientSecret: string | undefined;
    cartShippingOption: any;
    shippingRates: ShippingOptionType[];
    idempotencyKey: string | undefined;
    items: CartProductType[];
    totalCartPrice: number;
    setClearData: Dispatch<SetStateAction<boolean>>;
    setIsVerifying: Dispatch<SetStateAction<boolean>>;
    setDefaultEmail: Dispatch<SetStateAction<string>>;
    setDefaultShipping: Dispatch<SetStateAction<any>>;
    setDefaultBillingValues: Dispatch<SetStateAction<any>>;
    setShippingId: Dispatch<SetStateAction<any>>;
    setChangeKey: Dispatch<SetStateAction<number>>;
    setErrorMessage: Dispatch<SetStateAction<{ message: string | undefined }>>;
    clearData: boolean;
    storePurchaseDetails: (response: any) => void;
    dispatch: Dispatch<any>;
    router: AppRouterInstance;
};

export default async function usePaymentAttemptInfo({
    paymentId,
    clientSecret,
    cartShippingOption,
    shippingRates,
    idempotencyKey,
    items,
    totalCartPrice,
    setClearData,
    setIsVerifying,
    setDefaultEmail,
    setDefaultShipping,
    setDefaultBillingValues,
    setShippingId,
    setChangeKey,
    setErrorMessage,
    clearData,
    storePurchaseDetails,
    dispatch,
    router
}: UsePaymentAttemptInfoParams) {
    try {
        setIsVerifying(true);
        const response = await fetch('/api/get-payment-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payment_intent: paymentId }),
        });

        const data = await response.json();

        try {
            const charge = await fetch('/api/get-payment-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ charge_id: data.latest_charge }),
            });

            const chargeResponse = await charge.json();

            setDefaultEmail(chargeResponse.billing_details.email);
            setDefaultShipping(chargeResponse.shipping);
            setDefaultBillingValues({ billingDetails: chargeResponse.billing_details });
            const fullShippingRate: ShippingOptionType = shippingRates[chargeResponse.metadata.shipping_id];
            if (fullShippingRate) {
                dispatch({ type: "ADD_SHIPPING_TO_CART", payload: fullShippingRate });
                setShippingId(fullShippingRate);
            }
            setChangeKey((prev: number) => prev + 1);

            if (chargeResponse.status === "succeeded") {
                const timer = setTimeout(() => {
                    setIsVerifying(false);
                    if (!clearData)
                        storePurchaseDetails({
                            response: chargeResponse,
                            cartShippingOption,
                            idempotencyKey,
                            items,
                            totalCartPrice,
                            dispatch,
                            setClearData,
                            router,
                        });
                }, 8000);

                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setIsVerifying(false);
                    setErrorMessage({ message: chargeResponse.failure_message });
                }, 8000);

                return () => clearTimeout(timer);
            }
        } catch (error) {
            console.error('Error getting payment details:', error);
    
            if (error instanceof Error) {
                setErrorMessage({ message: `Request failed: ${error.message}` });
            } else {
                setErrorMessage({ message: 'Error getting payment details.' });
            }
            setErrorMessage({ message: 'An error occurred when getting payment details. Please try again.' });
        }

        setDefaultShipping({
            name: data.shipping.name,
            phone: data.shipping.phone,
            address: data.shipping.address,
        });
    } catch (error) {
        console.error('Error checking payment status:', error);
    }
};