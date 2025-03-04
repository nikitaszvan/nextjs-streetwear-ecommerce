
import CartSummary from "@/components/layout/cart-summary";
import Link from "next/link";

export default function CartSummaryLayout() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-12 xl:gap-x-8 py-6">
                <CartSummary editable className="col-span-12"/>
            </div>
            <Link href="/checkout" className="flex py-2 px-6 w-full rounded-full bg-black my-6 mb-2" passHref>
                <span className="text-center text-white w-full text-lg font-semibold">Confirm Cart</span>
            </Link>
            <Link href="/all-products" className="w-fit self-center">
                <span className="underline font-medium text-base">Continue Shopping</span>
            </Link>
        </main>
    )
}