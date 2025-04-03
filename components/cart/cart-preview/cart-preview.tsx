"use client";

// External Libraries
import { useRef, useEffect } from "react";

// Context
import { useCart } from "@/context/cart-context";

// Service Layer
import { useScrollLock } from '@/lib/hooks/use-scroll-lock';

// Presentation Layer
import Header from './header';
import CartItem from './cart-item';
import Footer from './footer';
import { ShoppingBasketIcon } from "lucide-react";

const CartPreview = () => {
  const { dispatch, cart: { items, isCartPreviewVisible, totalCartPrice, justAddedProduct } } = useCart();
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [isCartPreviewVisible]);

  const closeCartPreview = () => {
    dispatch({ type: 'HIDE_CART_PREVIEW' });
  };

  useScrollLock(isCartPreviewVisible);

  const emptyCart = () => (
    <div className="flex flex-col items-center justify-center px-6 h-full !my-0">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-3">
        <ShoppingBasketIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-bold tracking-tight mb-2">Your cart is empty</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-md text-center">
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
    </div>
  );

  return (
    <div
      onClick={closeCartPreview}
      className={`fixed top-0 w-full h-screen bg-black/25 z-50 flex transition-all duration-200 justify-end ${isCartPreviewVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-preview-background-layer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col bg-white h-full w-[21rem] transform transition-all duration-200 ease-in-out ${isCartPreviewVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <Header justAddedProduct={justAddedProduct} dispatch={dispatch} />
        <div ref={divRef} className={`overflow-y-auto grow pb-0 px-0 space-y-4 ${items.length && 'divide-y'}`} aria-labelledby="cart-items">
          <h2 id="cart-items" className="sr-only">Cart Items</h2>
          {items.length ?
            items.map((item, index) =>
              <CartItem key={index} item={item} dispatch={dispatch} className={index === 0 ? "border-none" : ""} />
            )
            :
            emptyCart()
          }
        </div>
        <Footer totalCartPrice={totalCartPrice} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default CartPreview;