"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import ShippingOptionsWrapper from "./shipping-options-wrapper";

import Form from "next/form";

export default function CheckoutForm({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(elements);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success`
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {

    }

    setLoading(false);
  };

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount*100 }),
    })
      .then((res) => res.json())
      .then((json) => setClientSecret(json.clientSecret));
  }, [amount]);


  return (
    <Form onSubmit={handlePay} action="#" className="flex flex-col gap-4">
      <LinkAuthenticationElement />
      <ShippingOptionsWrapper />
      {clientSecret && <PaymentElement />}
      <button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-8 w-full rounded-full text-lg"
        type="submit"
        disabled = {!stripe || loading}
      >
        {!loading ? `Pay ${amount} CAD` : "Processing..."}
      </button>
      <span>{errorMessage}</span>
    </Form>
  );
}