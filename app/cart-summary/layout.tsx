
import CartSummary from "@/components/cart/cart-summary";

export default function CartSummaryLayout() {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-12 xl:gap-x-8 py-6">
                <CartSummary editable className="col-span-12"/>
            </div>
        </main>
    )
}