"use client";

// External Libraries
import classNames from "classnames";

// Context
import { useCart } from "@/context/cart-context";

// Presentation Layer
import CartSummaryHeader from "./cart-summary-header";
import CartSummaryTable from "./cart-summary-table";
import CartSummaryConfirm from "./cart-summary-confirm";

const CartSummary = ({ editable = false, className = "" }) => {
  const {
    cart: { items, totalCartPrice, totalItemCount, cartShippingOption },
    dispatch,
  } = useCart();

  return (
    <section className={className} aria-labelledby="cart-summary-section">
      <div className={classNames({ "max-w-5xl mx-auto": editable })}>
        <CartSummaryHeader editable={editable} totalItemCount={totalItemCount} />
        <CartSummaryTable
          items={items}
          editable={editable}
          dispatch={dispatch}
          cartShippingOption={cartShippingOption}
          totalCartPrice={totalCartPrice}
        />
        {editable && <CartSummaryConfirm totalCartPrice={totalCartPrice} />}
      </div>
    </section>
  );
};

export default CartSummary;