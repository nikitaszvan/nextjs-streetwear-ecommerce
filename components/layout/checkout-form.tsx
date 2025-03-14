"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import ShippingOptionsWrapper from "./shipping-options-wrapper";
import { useCart } from "@/context/cart-context";

import Form from "next/form";

export default function CheckoutForm({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const cart = useCart();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })
      .then((res) => res.json())
      .then((json) => {
        setClientSecret(json.clientSecret);
        setKey(json.idempotencyKey);
      });
  }, []);



  const handlePay = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log('Elements:', elements);

    if (!stripe || !elements) {
      setErrorMessage('Stripe is not initialized.');
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }
    }
    catch (error) {
      console.error((error as Error).message);
    }

    console.log('Saving to localStorage:', { cartId: key, cart });
    const existingCart = JSON.parse(localStorage.getItem('purchaseCart') || '[]');

    const updatedCart = [...existingCart, { cartId: key, cart }];

    localStorage.setItem('purchaseCart', JSON.stringify(updatedCart));

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `http://www.localhost:3000/verify-payment`,
        },
        redirect: 'if_required',
      })

      // `http://www.localhost:3000/payment-success?key=${key}`

      if (error) {
        const filteredCart = updatedCart.filter(item => item.cartId !== key);
        localStorage.setItem('purchaseCart', JSON.stringify(filteredCart));
        setErrorMessage(error.message);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      console.error('Error confirming payment:', err);
    }

    setLoading(false);
  };


  return (
    <Form onSubmit={handlePay} action="#" className="flex flex-col gap-4">
      <LinkAuthenticationElement />
      <ShippingOptionsWrapper />
      {clientSecret && <PaymentElement />}
      <button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-8 w-full rounded-full text-lg"
        type="submit"
        disabled={!stripe || loading}
      >
        {!loading ? `Pay ${amount} CAD` : "Processing..."}
      </button>
      <span>{errorMessage}</span>
    </Form>
  );
}