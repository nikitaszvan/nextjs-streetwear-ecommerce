// External Libraries
import Link from "next/link";
import { Dispatch } from "react";

// Types
import { CartAction } from "@/types/cart-types";

// Presentation Layer
import { Button } from "@/components/ui/button";

type FooterParams = {
  totalCartPrice: number;
  dispatch: Dispatch<CartAction>;
};

const Footer = ({
  totalCartPrice,
  dispatch
}: FooterParams) => {

  const closeCartPreview = () => {
    dispatch({ type: 'HIDE_CART_PREVIEW' });
  };

  return (
    <footer className="bottom-0 w-full border-t bg-white p-4 lg:px-6" aria-labelledby="cart-summary-footer">
      <h2 id="cart-summary-footer" className="sr-only">Cart Summary Footer</h2>
      <section className="space-y-2">
        <div>
          <div className="flex font-medium justify-between" aria-label="Estimated Total">
            <span>Est. Total</span>
            <span>CAD {totalCartPrice}</span>
          </div>
          <p className="pb-3 text-xs">Shipping &amp; Tax calculated at checkout</p>
          <Button onClick={closeCartPreview} className="flex py-2 px-6 w-full rounded-full bg-black" disabled={!!!totalCartPrice}>
            <Link href="/cart-summary" passHref>
              <span className={`text-center text-white w-full`}>Checkout</span>
            </Link>
          </Button>
        </div>
      </section>
    </footer>
  );
};

export default Footer;