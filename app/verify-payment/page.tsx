import CartSummary from "@/components/layout/cart-summary";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import BlurredCheckoutForm from "@/components/layout/blurred-checkout-form";
import PaymentVerifyLoader from "@/components/layout/payment-verify-loader";


export default async function VerifyPaymentPage
    ({ searchParams }:
    { searchParams: Promise<Record<string, string | undefined>> }) {
    const { payment_intent } = await searchParams;

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
                <div className="my-8 xl:col-span-7 sticky top-[4rem] h-fit">
                    <Link href="/cart-summary" className="flex mb-4 items-center w-fit">
                        <ChevronLeftIcon className="" height={20} />
                        <span className="hover:underline">Edit Cart</span>
                    </Link>
                    <CartSummary />
                </div>
                <div className="relative my-8 max-w-[65ch] xl:col-span-5">
                    <section className="max-w-md">
                        <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below.</p>
                    </section>
                    <BlurredCheckoutForm />
                    <PaymentVerifyLoader paymentId={payment_intent && payment_intent}/>
                </div>
            </div>
            <h2 id="radix-:r5:" className="text-lg font-semibold leading-none tracking-tight sr-only">Checkout</h2>
        </main>
    );
}