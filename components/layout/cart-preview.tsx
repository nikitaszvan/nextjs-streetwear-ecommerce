"use client"

import { useCart } from "@/context/cart-context";
import { useScrollLock } from '@/hooks/scroll-lock';
import { Cross1Icon } from "@radix-ui/react-icons";
import { Trash, Trash2 } from 'lucide-react';
import { ProductType } from "@/types/product-types";
import { CartProductType } from "@/types/cart-types";


const CartPreview = () => {
    const { cart: {items, isCartPreviewVisible} } = useCart();
    const { dispatch } = useCart();

    const handleRemoveFromCart = (product: CartProductType) => {
        dispatch({ type: 'REMOVE_ITEM', payload: product });
    };

    const closeCartPreview = () => {
        dispatch({ type: 'HIDE_CART_PREVIEW' });
    };

    useScrollLock(isCartPreviewVisible);

  if (!isCartPreviewVisible) return null;

    return (
        <div className="absolute w-full h-screen h-full top-0 bg-black/25 z-50">
            <div className="fixed top-0 right-0 bg-white h-full">
                <header className="w-full flex items-center between border-b border-gray-70 p-4 lg:px-6 title-3">
                    <h1 className="line-clamp-1 w-full font-semibold text-lg">Added to Cart!</h1>
                    <button onClick={closeCartPreview} type="button" className="">
                        <Cross1Icon aria-hidden="true" className="block shrink-0 w-$w h-$h" />
                    </button>
                </header>
                <div className="overflow-y-auto pb-0 px-0 space-y-4">
                    <section className="py-4 px-4 pb-0 text-sm">Free Standard Shipping</section>
                    {items.length ? items.map((item, index) => 
                        <article key={index} className="pt-4 space-y-2 p-4">
                            <div className="flex items-start justify-between">
                                <p className="line-clamp-3 text-sm font-medium leading-[1.125rem]">
                                    <a href="" className="router-link-active router-link-exact-active duration hover:underline">{item["clothing-name"]}</a>
                                </p>
                                <button onClick={() => handleRemoveFromCart(item)} type="button" aria-label="Remove Item" className="h-full">
                                    <Trash2 className="h-4 text-gray-500"/>
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <a href="/en-ca/p/womens/womens-jackets-and-vests/womens-rainwear-299273/womens-antora-triclimate-NF0A7UKN?color=5FO" className="router-link-active router-link-exact-active shrink-0 self-start" data-test-id="thumbnail">
                                    <picture data-test-id="base-picture">
                                        <img alt="Women's Antora Triclimate®" height="94" loading="lazy" src="https://assets.thenorthface.com/images/t_img/c_pad,g_north_west,f_auto,h_94,w_94,e_sharpen:60/dpr_2.0/v1723429933/NF0A7UKN5FO-HERO/Womens-Antora-Triclimate.png?$PLP-IMAGE$" width="94"/>
                                    </picture>
                                </a>
                                <div className="w-full space-y-2">
                                    <div className="text-gray-700 text-sm" data-test-id="mini-cart-product-variants">
                                        <p className="line-clamp-1 mb-1">Algae Blue/Midnight Petrol</p>
                                        <p className="line-clamp-1 mb-1">S</p>
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
                <footer className="fixed bottom-0 w-full border-t bg-white p-4 lg:px-6">
                    <section className="space-y-2">
                        <div>
                            <div className="flex font-medium justify-between">
                                <span>Est. Total</span>
                                <span>CAD&nbsp;339.99</span>
                            </div>
                            <p className="pb-3 text-xs">Shipping &amp; Tax calculated at checkout</p>
                            <a href="" className="flex py-2 px-6 w-full rounded-full bg-black">
                                <span className="text-center text-white w-full">View Cart</span>
                            </a>
                        </div>
                    </section>
                </footer>
            </div>
        </div>
  )
}

export default CartPreview;

