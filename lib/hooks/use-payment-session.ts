// External Libraries
import { useEffect, useState, Dispatch } from "react";

// Types
import { StripeSessionType, CartAction } from "@/types/cart-types";
import { ShippingOptionType } from "@/types/stripe-element-types";
import { getUserSessionId } from "../utils/get-user-session-id";

type PaymentSessionParams = {
    amount: number;
    paymentId: string | undefined;
    clientSecret: string | undefined;
    idempotencyKey: string | undefined;
    activeStripeSession: StripeSessionType | null;
    cartShippingOption: ShippingOptionType | null;
    totalCartPrice: number;
    dispatch: Dispatch<CartAction>;
    isLoading: boolean;
}

const usePaymentSession = ({
    amount,
    paymentId,
    clientSecret,
    idempotencyKey,
    activeStripeSession,
    cartShippingOption,
    totalCartPrice,
    dispatch,
    isLoading
}: PaymentSessionParams) => {
  const [paymentIntentId, setPaymentIntentId] = useState<StripeSessionType | null>(
    paymentId && clientSecret && idempotencyKey ? { paymentId, clientSecret, idempotencyKey } : null
  );

  useEffect(() => {
    const updateStripeAmount = (id: StripeSessionType) => {
      fetch('/api/update-stripe-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_intent_id: id.paymentId,
          shipping_option: cartShippingOption,
          amount: totalCartPrice * 100,
        }),
      });
    };

    if (!isLoading) {
      if (activeStripeSession) setPaymentIntentId(activeStripeSession);
      else if (paymentId && clientSecret && idempotencyKey) setPaymentIntentId({ paymentId, clientSecret, idempotencyKey });
      else {
        fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: amount * 100, sessionId: getUserSessionId()}),
        })
          .then((res) => res.json())
          .then((json) => {
            const sessionInfo = { paymentId: json.paymentIntentId, clientSecret: json.clientSecret, idempotencyKey: json.idempotencyKey };
            dispatch({ type: "ADD_STRIPE_SESSION", payload: sessionInfo });
            setPaymentIntentId(sessionInfo);

          });
      }
    }

    if (paymentIntentId) updateStripeAmount(paymentIntentId);

  }, [isLoading, paymentIntentId, cartShippingOption, totalCartPrice, activeStripeSession, paymentId, clientSecret, idempotencyKey, amount, dispatch]);

  return paymentIntentId;
};

export default usePaymentSession;