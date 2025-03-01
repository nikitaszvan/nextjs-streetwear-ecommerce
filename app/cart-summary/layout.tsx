
import CartSummary from "@/components/layout/cart-summary";
import Link from "next/link";

export default function CartSummaryLayout() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-12 xl:gap-x-8">
                <CartSummary editable className="col-span-12"/>
            </div>
            <Link href="/checkout" className="flex py-2 px-6 w-full rounded-full bg-black" passHref>
                <span className="text-center text-white w-full">Confirm Cart</span>
            </Link>
        </main>
    )
}