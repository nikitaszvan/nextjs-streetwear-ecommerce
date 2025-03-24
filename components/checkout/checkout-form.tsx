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
import { ShippingOptionType, StripeShippingAddressType } from "@/types/stripe-element-types";
import PaymentVerifyLoader from "./payment-verify-loader";
import { StripeSessionType } from "@/types/cart-types";

import Form from "next/form";

type ErrorMessageType = {
  message: string | undefined;
}

export default function CheckoutForm({ amount, paymentId, clientSecret, idempotencyKey }: { amount: number, paymentId: string | undefined, clientSecret: string | undefined, idempotencyKey: string | undefined }) {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [shippingId, setShippingId] = useState<ShippingOptionType | string | null>(null);
  const [validPayment, setValidPayment] = useState<boolean | null>(null);
  const [changeKey, setChangeKey] = useState<number>(0);
  const [clearData, setClearData] = useState<boolean>(false);
  const [paymentIntentId, setPaymentIntentId] = useState<StripeSessionType | null>(
    paymentId && clientSecret && idempotencyKey ? { paymentId, clientSecret, idempotencyKey } : null
  );
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

  const [defaultShipping, setDefaultShipping] = useState<StripeShippingAddressType | undefined>(undefined);

  const { cart: { items, activeStripeSession, cartShippingOption, totalCartPrice }, dispatch, isLoading } = useCart();

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const saveEmailToSession = (email: string) => {
    const userEmailField = JSON.stringify(email);

    sessionStorage.setItem('userEmailFields', userEmailField);
  }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage.message);
    }
  }, [errorMessage]);

  useEffect(() => {
    const storedAddressInfo = sessionStorage.getItem('userAddressFields');
    const storedEmailInfo = sessionStorage.getItem('userEmailFields');

    if (storedAddressInfo) {
      setDefaultShipping(JSON.parse(storedAddressInfo));
      setDefaultEmail(storedEmailInfo ? JSON.parse(storedEmailInfo) : "");
    } else {
      console.log('No user information found in session storage.');
    }
  }, [])


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
          body: JSON.stringify({ amount: amount * 100 }),
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

  }, [isLoading]);


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

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        clientSecret: paymentIntentId!.clientSecret,
        confirmParams: {
          return_url: `http://www.localhost:3000/checkout?idempotency_key=${paymentIntentId?.idempotencyKey}`,
        },
        redirect: 'if_required',
      });

      // `http://www.localhost:3000/payment-success?key=${key}`

      if (paymentIntent && (paymentIntent.status === 'succeeded')) {
        router.push(`http://www.localhost:3000/checkout?idempotency_key=${paymentIntentId?.idempotencyKey}&payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}`);
      }
      else if (error) {
        setErrorMessage({ message: error.message });
      }
    } catch (err) {
      setErrorMessage({ message: 'An unexpected error occurred. Please try again.' });
    }

    setLoading(false);
  };

  const generateConfirmationNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  };

  function storeOrderData(response: any) {
    if (cartShippingOption !== null) {
      localStorage.setItem(
        idempotencyKey!,
        JSON.stringify({
          confirmation_number: generateConfirmationNumber(),
          order_date: new Date(),
          purchaseItems: items,
          customerAddress: response.shipping,
          subTotal: totalCartPrice,
          cartShippingOption: cartShippingOption
        })
      );
      router.push(`/payment-success?key=${idempotencyKey}`);
      dispatch({ type: "CLEAR_CART" });
      sessionStorage.removeItem('userAddressFields');
      sessionStorage.removeItem('userEmailFields');
      sessionStorage.removeItem('userShippingOptionFields');
    } else {
      setTimeout(storeOrderData, 500); // Retry every 1 second
    }
  }


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

          setDefaultEmail(chargeResponse.billing_details.email);
          setDefaultShipping(chargeResponse.shipping);
          setDefaultBillingValues({ billingDetails: chargeResponse.billing_details });
          setShippingId(chargeResponse.metadata.shipping_id);
          setChangeKey((prev) => prev + 1);

          if (chargeResponse.status === "succeeded") {

            const timer = setTimeout(() => {
              setValidPayment(true);
              setIsVerifying(false);
              if (!clearData) storeOrderData(chargeResponse);
            }, 8000);

            return () => clearTimeout(timer);
          }

          else {

            const timer = setTimeout(() => {
              setValidPayment(false);
              setIsVerifying(false);

              setErrorMessage({ message: chargeResponse.failure_message });
            }, 8000);

            return () => clearTimeout(timer);
          }
        } catch (error) {

        }

        setDefaultShipping({
          name: data.shipping.name,
          phone: data.shipping.phone,
          address: data.shipping.address
        });
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };
    if (paymentId && clientSecret) getPaymentAttemptInfo(paymentId);
  }, [paymentId, clientSecret, cartShippingOption]);


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

        onChange={(e) => {
          setDefaultEmail(() => {

            const activeEmail = e.value.email;

            saveEmailToSession(activeEmail);

            return activeEmail;
          });
        }}
      />
      {paymentIntentId &&
        <ShippingOptionsWrapper
          key={changeKey + 'ship-wrap'}
          paymentId={paymentIntentId}
          shipping={shippingId || cartShippingOption}
          defaultShippingAddress={defaultShipping}
          className={`${isVerifying && "pointer-events-none"}`}
        />}
      {paymentIntentId && <PaymentElement
        key={changeKey + 'pay-elem'}
        options={{
          defaultValues: defaultBillingValues,
        }}
        className={`${isVerifying && "pointer-events-none"}`}

      />}
      <button
        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-8 w-full rounded-full text-lg ${isVerifying && "pointer-events-none"}`}
        type="submit"
        disabled={!stripe || loading}
      >
        {!loading ? `Pay ${amount + (cartShippingOption ? cartShippingOption.fixed_amount.amount / 100 : 0)} CAD` : "Processing..."}
      </button>
      <ToastContainer />
    </Form>
  );
}