
import CartSummary from "@/components/layout/cart-summary";
import StripeElementsWrapper from "@/components/layout/stripe-elements-wrapper";

export default function CheckoutLayout() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
                <CartSummary />
                <StripeElementsWrapper />
            </div>
            <h2 id="radix-:r5:" className="text-lg font-semibold leading-none tracking-tight sr-only">Shopping cart</h2>
        </main>
    );
}