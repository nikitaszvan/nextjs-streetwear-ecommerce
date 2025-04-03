// Presentation Layer
import CartSummary from "@/components/cart/cart-summary/cart-summary";
import StripeElementsWrapper from "@/components/checkout/stripe-elements-wrapper";

// External Libraries
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  let paymentId = (await searchParams)?.payment_intent;
  let clientSecret = (await searchParams)?.payment_intent_client_secret;
  let idempotencyKey = (await searchParams)?.idempotency_key;

  if (Array.isArray(paymentId)) {
    paymentId = paymentId[0];
  }

  if (Array.isArray(clientSecret)) {
    clientSecret = clientSecret[0];
  }

  if (Array.isArray(idempotencyKey)) {
    idempotencyKey = idempotencyKey[0];
  }

  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8"
      role="main"
      aria-label="Checkout Page"
    >
      <div className="gap-4 lg:gap-10 w-full flex flex-col lg:flex-row items-center lg:items-start">
        <div className="lg:my-8 lg:sticky md:relative lg:top-[5rem] w-full flex-1 lg:max-w-2xl lg:min-w-[33rem] max-w-2xl">
          <Link href="/cart-summary" className="flex mb-4 items-center w-fit" aria-label="Edit Cart">
            <ChevronLeftIcon height={20} aria-hidden="true" />
            <span className="hover:underline">Edit Cart</span>
          </Link>
          <CartSummary />
        </div>
        <StripeElementsWrapper
          paymentId={paymentId}
          clientSecret={clientSecret}
          idempotencyKey={idempotencyKey}
        />
      </div>
      <h2 className="text-lg font-semibold leading-none tracking-tight sr-only">Checkout</h2>
    </main>
  );
};

export default CheckoutPage;
