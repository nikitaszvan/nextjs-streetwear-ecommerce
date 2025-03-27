"use client";

// External Libraries
import { useRef, useEffect } from "react";

// Context
import { useCart } from "@/context/cart-context";

// Service Layer
import { useScrollLock } from '@/lib/hooks/use-scroll-lock';

// Presentation Layer
import CartPreviewHeader from './cart-preview-header';
import CartPreviewItem from './cart-preview-item';
import CartPreviewFooter from './cart-preview-footer';

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

  return (
    <div
      onClick={closeCartPreview}
      className={`fixed top-0 z-overlay w-full h-screen bg-black/25 z-50 flex transition-all duration-200 justify-end ${isCartPreviewVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-preview-background-layer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col bg-white h-full w-[21rem] transform transition-all duration-200 ease-in-out ${isCartPreviewVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
      >
        <CartPreviewHeader justAddedProduct={justAddedProduct} dispatch={dispatch} />
        <div ref={divRef} className="overflow-y-auto grow pb-0 px-0 space-y-4 divide-y" aria-labelledby="cart-items">
          <h2 id="cart-items" className="sr-only">Cart Items</h2>
          {items.length ? items.map((item, index) => (
            <CartPreviewItem key={index} item={item} dispatch={dispatch} />
          )) : <div>Cart is empty</div>}
        </div>
        <CartPreviewFooter totalCartPrice={totalCartPrice} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default CartPreview;