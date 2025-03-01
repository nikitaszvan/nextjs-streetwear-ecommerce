"use client"

import { useCart } from "@/context/cart-context";
import { useScrollLock } from '@/hooks/scroll-lock';
import { Cross1Icon } from "@radix-ui/react-icons";
import { Trash2 } from 'lucide-react';
import { CartProductType } from "@/types/cart-types";
import Link from "next/link";
import { makeSlug } from "@/utils/string-utils";
import { useRef, useEffect } from "react";
import { sizesRef } from "@/constants/product-constants";
import Image from "next/image";


const CartPreview = () => {
    const { dispatch, cart: {items, isCartPreviewVisible, totalCartPrice, justAddedProduct} } = useCart();
    const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [isCartPreviewVisible]);

    const handleRemoveFromCart = (product: CartProductType) => {
        dispatch({ type: 'REMOVE_ITEM', payload: product });
    };

    const closeCartPreview = () => {
        dispatch({ type: 'HIDE_CART_PREVIEW' });
    };

    useScrollLock(isCartPreviewVisible);

    return (
        <div onClick={closeCartPreview} className={`fixed top-0 z-overlay w-full h-screen h-full bg-black/25 z-50 flex transition-all duration-200 justify-end ${isCartPreviewVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={(e) => e.stopPropagation()} className={`flex flex-col bg-white h-full w-[21rem] transform transition-all duration-200 ease-in-out ${
          isCartPreviewVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
                <header className="w-full flex items-center between border-b border-gray-70 p-4 lg:px-6 title-3">
                    <h1 className="line-clamp-1 w-full font-semibold text-lg">{justAddedProduct ? 'Added to Cart!' : 'Shopping Cart'}</h1>
                    <button onClick={closeCartPreview} type="button" className="">
                        <Cross1Icon aria-hidden="true" className="block shrink-0 w-$w h-$h" />
                    </button>
                </header>
                <div ref={divRef} className="overflow-y-auto grow pb-0 px-0 space-y-4 divide-y">
                    {items.length ? items.map((item, index) => 
                        <article key={index} className="pt-4 space-y-2 p-4 px-5">
                            <div className="flex items-start justify-between">
                                <p className="line-clamp-3 text-md py-1 font-medium leading-[1.125rem]">
                                    <Link onClick={closeCartPreview} href={`/${item['category_pk'].slice(9)}/${makeSlug(item['clothing-name'])}`} className="router-link-active router-link-exact-active duration hover:underline">{item["clothing-name"]}</Link>
                                </p>
                                <button onClick={() => handleRemoveFromCart(item)} type="button" aria-label="Remove Item" className="h-full">
                                    <Trash2 className="h-4 text-gray-500"/>
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <Link onClick={closeCartPreview} href={`/${item['category_pk'].slice(9)}/${makeSlug(item['clothing-name'])}`} className="relative router-link-active router-link-exact-active shrink-0 self-start aspect-square h-[6rem] overflow-hidden" data-test-id="thumbnail">
                                    <Image alt={`${item["clothing-name"]} model`} className='scale-200' src={item["image-url"]} fill/>
                                </Link>
                                <div className="w-full space-y-2">
                                    <div className="text-gray-700 text-sm" data-test-id="mini-cart-product-variants">
                                        <p className="line-clamp-1 mb-1">Color: {item.color!.name}</p>
                                        <p className="line-clamp-1 mb-1">{sizesRef[item.size!]}</p>
                                        <p className="line-clamp-1 mb-2">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm lh-1 text-sm">
                                        <span className="gap-x-2 wrap i-flex font-medium">
                                            <span className="">CAD&nbsp;{item["clothing-price"]}</span>
                                        </span>
                                    </div>
                                </div>
                            </div> 
                        </article>) :
                        <div> Cart is empty</div>
                    }
                </div>
                <footer className="bottom-0 w-full border-t bg-white p-4 lg:px-6">
                    <section className="space-y-2">
                        <div>
                            <div className="flex font-medium justify-between">
                                <span>Est. Total</span>
                                <span>CAD {totalCartPrice}</span>
                            </div>
                            <p className="pb-3 text-xs">Shipping &amp; Tax calculated at checkout</p>
                            <Link href="/cart-summary" onClick={closeCartPreview} className="flex py-2 px-6 w-full rounded-full bg-black" passHref>
                                <span className="text-center text-white w-full">Checkout</span>
                            </Link>
                        </div>
                    </section>
                </footer>
            </div>
        </div>
  )
}

export default CartPreview;

