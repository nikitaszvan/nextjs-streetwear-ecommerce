// Presentation Layer
import CartSummary from "@/components/cart/cart-summary/cart-summary";

const CartSummaryPage = () => {
  return (
    <main
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-6 pt-2 sm:px-6 lg:px-8"
      role="main"
      aria-label="Cart Summary"
    >
      <h1 className="sr-only">Cart Summary</h1>
      <CartSummary editable className="col-span-12" />
    </main>
  );
};

export default CartSummaryPage;