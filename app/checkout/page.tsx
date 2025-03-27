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
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8"
      role="main"
      aria-label="Checkout Page"
    >
      <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
        <div className="my-8 xl:col-span-7 sticky top-[4rem] h-fit">
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