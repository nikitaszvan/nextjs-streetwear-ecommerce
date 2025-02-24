import CartSummary from "@/components/layout/cart-summary";


export default function CheckoutLayout({
    children,
}: Readonly<{
    children?: React.ReactNode;
}>) {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <div className="min-h-[calc(100dvh-7rem)] xl:grid xl:grid-cols-12 xl:gap-x-8">
                <CartSummary />
                <div className="my-8 max-w-[65ch] xl:col-span-5">
                    <section className="max-w-md pb-12">
                        <h2 className="text-3xl font-bold leading-none tracking-tight">Checkout</h2>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">Provide billing and shipping details below.</p>
                    </section>
                </div>
            </div>
            <h2 id="radix-:r5:" className="text-lg font-semibold leading-none tracking-tight sr-only">Shopping cart</h2>
        </main>
    )
}      