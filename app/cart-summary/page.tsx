// Presentation Layer
import CartSummary from "@/components/cart/cart-summary/cart-summary";

export default function CartSummaryPage() {
  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8"
      role="main"
      aria-label="Cart Summary"
    >
      <h1 className="sr-only">Cart Summary</h1> {/* Screen reader only heading for context */}
      <div className="xl:grid xl:grid-cols-12 xl:gap-x-8 py-6">
        <CartSummary editable className="col-span-12" />
      </div>
    </main>
  );
}