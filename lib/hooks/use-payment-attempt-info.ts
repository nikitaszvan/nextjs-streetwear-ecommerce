// External Libraries
import { Dispatch, SetStateAction, useEffect } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Service Layer
import { BillingOptionType, ShippingOptionType, StripeShippingAddressType } from '@/types/stripe-element-types';

// Types
import { CartAction, CartProductType } from '@/types/cart-types';
import { StoreOrderDataParams } from '../utils/store-purchase-details-utils';

type UsePaymentAttemptInfoParams = {
    paymentId?: string;
    cartShippingOption: ShippingOptionType | null;
    shippingRates: ShippingOptionType[];
    idempotencyKey?: string;
    items: CartProductType[];
    totalCartPrice: number;
    setClearData: Dispatch<SetStateAction<boolean>>;
    setIsVerifying: Dispatch<SetStateAction<boolean>>;
    setDefaultEmail: Dispatch<SetStateAction<string>>;
    setDefaultShipping: Dispatch<SetStateAction<StripeShippingAddressType | undefined>>;
    setDefaultBillingValues: Dispatch<SetStateAction<BillingOptionType>>;
    setErrorMessage: Dispatch<SetStateAction<{ message?: string }>>;
    clearData: boolean;
    storePurchaseDetails: (param: StoreOrderDataParams) => void;
    dispatch: Dispatch<CartAction>;
    router: AppRouterInstance;
};

const usePaymentAttemptInfo = ({
    paymentId,
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
    setErrorMessage,
    clearData,
    storePurchaseDetails,
    dispatch,
    router
}: UsePaymentAttemptInfoParams) => {

    useEffect(() => {
        if (!paymentId) return;
    
        let isMounted = true;
    
        const fetchPaymentInfo = async () => {
            try {
                setIsVerifying(true);
    
                const response = await fetch('/api/get-payment-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ payment_intent: paymentId }),
                });
    
                const data = await response.json();
    
                if (!isMounted) return;
    
                const charge = await fetch('/api/get-payment-details', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ charge_id: data.latest_charge }),
                });
    
                const chargeResponse = await charge.json();
    
                if (!isMounted) return;
    
                setDefaultEmail(chargeResponse.billing_details.email);
                setDefaultShipping(chargeResponse.shipping);
                setDefaultBillingValues({ billingDetails: chargeResponse.billing_details });
    
                const fullShippingRate = shippingRates[chargeResponse.metadata.shipping_id];
                if (fullShippingRate) {
                    dispatch({ type: "ADD_SHIPPING_TO_CART", payload: fullShippingRate });
                }
    
                const handleVerification = setTimeout(() => {
                    if (!isMounted) return;
    
                    setIsVerifying(false);
    
                    if (chargeResponse.status === "succeeded") {
                        if (!clearData) {
                            storePurchaseDetails({
                                response: chargeResponse,
                                cartShippingOption,
                                idempotencyKey,
                                items,
                                totalCartPrice,
                                dispatch,
                                setClearData
                            });
                        }
                        router.push(`/payment-success?key=${idempotencyKey}`);
                    } else {
                        setErrorMessage({ message: chargeResponse.failure_message || 'Payment failed' });
                    }
                }, 8000);
    
                return () => clearTimeout(handleVerification);
            } catch (error) {
                if (!isMounted) return;
    
                console.error('Error fetching payment info:', error);
    
                setErrorMessage({
                    message: error instanceof Error ? `Request failed: ${error.message}` : 'Error getting payment details.',
                });
            }
        }
    
        fetchPaymentInfo();
    
        return () => {
            isMounted = false;
        };
    
    }, [
        paymentId, 
        cartShippingOption, 
        shippingRates, 
        idempotencyKey, 
        items, 
        totalCartPrice, 
        clearData, 
        router,
        storePurchaseDetails, 
        dispatch,
        setClearData,
        setDefaultBillingValues,
        setDefaultEmail,
        setDefaultShipping,
        setErrorMessage,
        setIsVerifying,
    ]);
};


export default usePaymentAttemptInfo;
