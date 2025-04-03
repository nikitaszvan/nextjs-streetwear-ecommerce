"use client";

// Presentation Layer
import ShippingOptionsWrapper from "./shipping-options-wrapper";
import PaymentVerifyLoader from "./payment-verify-loader";
import EmailInput from "./email-input";
import PaymentSubmitButton from "./payment-submit-button";
import Form from "next/form";

// Service Layer
import usePaymentSession from "@/lib/hooks/use-payment-session";
import useFetchShippingRates from "@/lib/hooks/use-fetch-shipping-rates";
import usePaymentAttemptInfo from "@/lib/hooks/use-payment-attempt-info";
import { handleStripePay } from "@/lib/utils/handle-stripe-pay-utils";
import { storePurchaseDetails } from "@/lib/utils/store-purchase-details-utils";

// Data Access Layer
import { useCart } from "@/context/cart-context";

// External Libraries
import { useState, useEffect, useMemo } from "react";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

// Types
import { BillingOptionType, StripeShippingAddressType } from "@/types/stripe-element-types";

type CheckoutFormParams = {
  amount: number;
  paymentId: string | undefined;
  clientSecret: string | undefined;
  idempotencyKey: string | undefined;
}

const CheckoutForm = ({
  amount,
  paymentId,
  clientSecret,
  idempotencyKey
}: CheckoutFormParams) => {
  const {
    cart: { items, activeStripeSession, cartShippingOption, totalCartPrice },
    dispatch,
    isLoading
  } = useCart();

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [clearData, setClearData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ message?: string | undefined }>({ message: undefined });
  const [defaultBillingValues, setDefaultBillingValues] = useState<BillingOptionType>({
    billingDetails: {
      name: '',
      email: '',
      phone: '',
      address: {
        postal_code: '',
        country: '',
      }
    }
  });
  const [defaultEmail, setDefaultEmail] = useState<string>("");
  const [defaultShipping, setDefaultShipping] = useState<StripeShippingAddressType | undefined>(undefined);
  console.log(defaultShipping);

  const memoizedBillingValues = useMemo(() => defaultBillingValues, [defaultBillingValues]);
  const memoizedShipping = useMemo(() => defaultShipping, [defaultShipping]);

  const paymentIntentId = usePaymentSession({
    amount,
    paymentId,
    clientSecret,
    idempotencyKey,
    activeStripeSession,
    cartShippingOption,
    totalCartPrice,
    dispatch,
    isLoading
  });
  const shippingRates = useFetchShippingRates();

  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();

  useEffect(() => {
    if (errorMessage.message) {
      toast.error(errorMessage.message);
    }
  }, [errorMessage]);

  useEffect(() => {

    const storedAddressInfo = sessionStorage.getItem('userAddressFields');
    const storedEmailInfo = sessionStorage.getItem('userEmailFields');

    if (storedAddressInfo) {
      setDefaultShipping(JSON.parse(storedAddressInfo));
    } else {
      console.log('No user information found in session storage.');
    }

    if (storedEmailInfo) {
      setDefaultEmail(storedEmailInfo ? JSON.parse(storedEmailInfo) : "");
    } else {
      console.log('No user email found in session storage.');
    }

    fetch('/api/update-stripe-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_intent_id: paymentId || activeStripeSession?.paymentId,
        shipping_option: cartShippingOption,
        amount: totalCartPrice * 100,
      }),
    });

  }, [paymentId, activeStripeSession?.paymentId, cartShippingOption, totalCartPrice]);

  usePaymentAttemptInfo({
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
  });

  return (
    <Form
      onSubmit={(e) =>
        handleStripePay({
          e,
          stripe,
          elements,
          paymentIntentId,
          cartShippingOption,
          setLoading,
          setErrorMessage,
          router
        })}
      action="#"
      className="flex flex-col gap-4 relative"
      aria-labelledby="checkout-form-title"
    >
      <h1 id="checkout-form-title" className="sr-only">Checkout Form</h1>
      {(isVerifying && !isLoading) && <PaymentVerifyLoader />}
      <EmailInput isVerifying={isVerifying} savedEmail={defaultEmail} />
      {paymentIntentId &&
        <ShippingOptionsWrapper
          paymentId={paymentIntentId}
          defaultShippingAddress={memoizedShipping}
          className={`${isVerifying && "pointer-events-none"}`}
          shippingOptions={shippingRates}
          isVerifying={isVerifying}
        />}
      {paymentIntentId &&
        <PaymentElement
          options={{
            defaultValues: memoizedBillingValues
          }}
          className={`${isVerifying && "pointer-events-none"}`}
        />}
      <PaymentSubmitButton
        amount={amount}
        cartShippingOption={cartShippingOption}
        loading={loading}
        stripe={stripe}
        isVerifying={isVerifying}
      />
      <ToastContainer />
    </Form>
  );
};

export default CheckoutForm;


