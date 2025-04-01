// Presentation Layer
import CartSummary from "@/components/cart/cart-summary/cart-summary";
import StripeElementsWrapper from "@/components/checkout/stripe-elements-wrapper";

// External Libraries
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | undefined>>;
}) {
  let paymentId;
  let clientSecret;
  let idempotencyKey;

  if (searchParams) {
    try {
      const { idempotency_key, payment_intent, payment_intent_client_secret } = await searchParams;
      paymentId = payment_intent;
      clientSecret = payment_intent_client_secret;
      idempotencyKey = idempotency_key;
    } catch (error) {
      console.error("Error resolving searchParams:", error);
    }
  } else {
    console.log("No searchParams provided.");
  }

  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8"
      role="main"
      aria-label="Checkout Page"
    >
      <div className="gap-4 lg:gap-10 w-full flex flex-col lg:flex-row items-center lg:items-start">
        <div className="lg:my-8 lg:sticky md:relative lg:top-[4rem] h-fit w-fit flex-1 lg:max-w-2xl lg:min-w-[33rem] max-w-2xl">
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
}