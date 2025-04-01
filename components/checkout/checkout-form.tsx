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
import { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

// Types
import { ShippingOptionType, StripeShippingAddressType } from "@/types/stripe-element-types";

export default function CheckoutForm({ amount, paymentId, clientSecret, idempotencyKey }: { amount: number, paymentId: string | undefined, clientSecret: string | undefined, idempotencyKey: string | undefined }) {
  // Context and Hooks
  const {
    cart: { items, activeStripeSession, cartShippingOption, totalCartPrice },
    dispatch,
    isLoading
  } = useCart();

  // State Hooks
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [shippingId, setShippingId] = useState<ShippingOptionType | string | null>(null);
  const [changeKey, setChangeKey] = useState<number>(0);
  const [clearData, setClearData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{ message: string | undefined }>({ message: undefined });
  const [defaultBillingValues, setDefaultBillingValues] = useState({
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

  // Custom Hooks
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

  // External Libraries
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

  }, []);

  useEffect(() => {
    if (paymentId && clientSecret)
      usePaymentAttemptInfo(
        {
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
          setShippingId,
          setChangeKey,
          setErrorMessage,
          clearData,
          storePurchaseDetails,
          dispatch,
          router
        }
      );
  }, [paymentId, clientSecret, cartShippingOption]);

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
      {isVerifying && <PaymentVerifyLoader />}
      <EmailInput key={`${changeKey}-link-elem`} isVerifying={isVerifying} savedEmail={defaultEmail} renderKey={`${changeKey}-link-elem`} />
      {paymentIntentId &&
        <ShippingOptionsWrapper
          key={changeKey + 'ship-wrap'}
          paymentId={paymentIntentId}
          shipping={shippingId || cartShippingOption}
          defaultShippingAddress={defaultShipping}
          className={`${isVerifying && "pointer-events-none"}`}
          shippingOptions={shippingRates}
          isVerifying={isVerifying}
        />}
      {paymentIntentId &&
        <PaymentElement
          key={changeKey + 'pay-elem'}
          options={{
            defaultValues: defaultBillingValues,
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
}