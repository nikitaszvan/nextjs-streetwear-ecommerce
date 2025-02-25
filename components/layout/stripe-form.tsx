// "use client"

// import { useEffect, useState } from 'react';
// import { loadStripe, StripeElements } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const StripeForm: React.FC = () => {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       const response = await fetch('/api/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();
//       setClientSecret(data.clientSecret);
//     };

//     fetchClientSecret();
//   }, []);

//   useEffect(() => {
//     const initializeStripe = async () => {
//       if (!clientSecret) return;

//       const stripe = await stripePromise;

//       if (!stripe) {
//         console.error('Stripe failed to load');
//         return;
//       }

//       const expressCheckoutOptions = {
//         buttonType: {
//           applePay: 'buy',
//           googlePay: 'buy',
//           paypal: 'buynow',
//           klarna: 'pay',
//         }
//       }

//       const elements: StripeElements = stripe.elements({ clientSecret });
//       const options = { mode: 'shipping' };
//       const paymentElementOptions = { layout: 'accordion'};
//       const linkAuthElement = elements.create('linkAuthentication');
//       linkAuthElement.mount('#link-auth-element');
//       const paymentElement = elements.create('payment', paymentElementOptions);
//       paymentElement.mount('#payment-element');
//       const addressElement = elements.create('address', options);
//       addressElement.mount('#address-element');
//     };

//     initializeStripe();
//   }, [clientSecret]);

//   return (
//     <div className=''>
//       <section className="max-w-md">
//         <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
//         <p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below.</p>
//       </section>
//       {clientSecret ?
//         <div className='flex flex-col gap-6'>
//           <div id="link-auth-element"></div>
//           <div id="address-element"></div>
//           <div id="payment-element"></div>
//         </div>
        
//         :
//         <p>Loading...</p>
//       }
//     </div>
//   );
// };

// export default StripeForm;

"use client";

import { ReactEventHandler, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default function CheckoutForm({ clientSecret }) {
  const appearance = {
    theme: 'stripe',
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm />
    </Elements>
  )
}