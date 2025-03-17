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
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StripeShippingAddressType } from "@/types/stripe-element-types";
import PaymentVerifyLoader from "./payment-verify-loader";

import Form from "next/form";

type ErrorMessageType = {
  message: string | undefined;
}

export default function CheckoutForm({ amount, paymentId, clientSecret }: { amount: number, paymentId: string | undefined, clientSecret: string | undefined }) {
  const [clientSecretId, setClientSecretId] = useState<string>(clientSecret || "");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [validPayment, setValidPayment] = useState<boolean | null>(null);
  const [changeKey, setChangeKey] = useState<number>(0)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(paymentId || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({ message: undefined });
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

  const [defaultEmail, setDefaultEmail] = useState("")

  const [defaultPaymentMethodOrder, setDefaultPaymentMethodOrder] = useState(
    [
      "card",
      "afterpay_clearpay",
      "affirm",
      "klarna",
    ]
  );

  const [defaultShipping, setDefaultShipping] = useState<StripeShippingAddressType | undefined>(undefined);

  const cart = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage.message);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (!paymentId || !clientSecret) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100 }),
      })
        .then((res) => res.json())
        .then((json) => {
          setClientSecretId(json.clientSecret);
          setKey(json.idempotencyKey);
          setPaymentIntentId(json.paymentIntentId);
        });
    } else {
      setPaymentIntentId(paymentId);
    }
  }, [amount, paymentId]);


  const handlePay = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setErrorMessage({ message: 'Stripe is not initialized.' });
      setLoading(false);
      return;
    }

    try {
      const test = await elements.submit();

    }
    catch (error) {

    }

    const existingCart = JSON.parse(localStorage.getItem('purchaseCart') || '[]');

    const updatedCart = [...existingCart, { cartId: key, cart }];

    localStorage.setItem('purchaseCart', JSON.stringify(updatedCart));


    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        clientSecret: clientSecretId,
        confirmParams: {
          return_url: `http://www.localhost:3000/checkout`,
        },
        redirect: 'if_required',
      });

      // `http://www.localhost:3000/payment-success?key=${key}`

      if (paymentIntent && (paymentIntent.status === 'succeeded')) {
        router.push(`http://www.localhost:3000/checkout?payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`)
      }
      else if (error) {
        const filteredCart = updatedCart.filter(item => item.cartId !== key);
        localStorage.setItem('purchaseCart', JSON.stringify(filteredCart));
        setErrorMessage({ message: error.message });
      }
    } catch (err) {
      setErrorMessage({ message: 'An unexpected error occurred. Please try again.' });
    }

    setLoading(false);
  };


  useEffect(() => {
    const getPaymentAttemptInfo = async (id: string) => {
      try {
        setIsVerifying(true);
        const response = await fetch('/api/get-payment-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ payment_intent: id }),
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

          console.log(chargeResponse);

          setDefaultEmail(chargeResponse.billing_details.email);
          setDefaultShipping(chargeResponse.shipping);
          setDefaultBillingValues({ billingDetails: chargeResponse.billing_details });
          setDefaultPaymentMethodOrder((prev) => [chargeResponse.payment_method_details.type, ...prev.filter((method) => method !== chargeResponse.payment_method_details.type)])
          setChangeKey((prev) => prev + 1);

          if (chargeResponse.status === "succeeded") {

            const timer = setTimeout(() => {
              setValidPayment(true);
              setIsVerifying(false);
              router.push(`/payment-success?key=${paymentId}`);
            }, 8000);

            return () => clearTimeout(timer);
          }

          else {

            const timer = setTimeout(() => {
              setValidPayment(false);
              setIsVerifying(false);

              setErrorMessage({message: chargeResponse.failure_message});
            }, 8000);

            return () => clearTimeout(timer);
          }
        } catch (error) {

        }

        // setDefaultShipping({
        //   name: data.shipping.name,
        //   phone: data.shipping.phone,
        //   address: data.shipping.address
        // });
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };
    if (paymentId && clientSecret) getPaymentAttemptInfo(paymentId);
  }, [paymentId, clientSecret]);

  return (
    <Form onSubmit={handlePay} action="#" className="flex flex-col gap-4 relative">
      {(isVerifying) &&
        <PaymentVerifyLoader />
      }
      <LinkAuthenticationElement
        key={changeKey + 'link-elem'}
        options={{
          defaultValues: {
            email: defaultEmail,
          },
        }}
        className={`${isVerifying && "pointer-events-none"}`}
      />
      {paymentIntentId &&
        <ShippingOptionsWrapper
          paymentId={paymentIntentId}
          defaultShippingAddress={defaultShipping}
          className={`${isVerifying && "pointer-events-none"}`}
        />}
      {clientSecretId && <PaymentElement
        key={changeKey + 'pay-elem'}
        options={{
          defaultValues: defaultBillingValues,
          paymentMethodOrder: defaultPaymentMethodOrder
        }}
        className={`${isVerifying && "pointer-events-none"}`}
      />}
      <button
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-8 w-full rounded-full text-lg ${isVerifying && "pointer-events-none"}`}
        type="submit"
        disabled={!stripe || loading}
      >
        {!loading ? `Pay ${amount} CAD` : "Processing..."}
      </button>
      <ToastContainer />
    </Form>
  );
}