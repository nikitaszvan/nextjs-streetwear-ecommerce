// External Libraries
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from 'lucide-react';
import { Dispatch } from "react";
import { cn } from "@/lib/utils/classname-utils";

// Service Layer
import { makeSlug } from "@/lib/utils/string-utils";

// Constants
import { sizesRef } from "@/constants/product-constants";

// Types
import { CartProductType } from "@/types/cart-types";
import { CartAction } from "@/types/cart-types";

type CartItemParams = {
  item: CartProductType;
  dispatch: Dispatch<CartAction>;
  className?: string;
};

const CartPreviewItem = ({
  item,
  dispatch,
  className
}: CartItemParams) => {

  const handleRemoveFromCart = (product: CartProductType) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  const closeCartPreview = () => {
    dispatch({ type: 'HIDE_CART_PREVIEW' });
  };

  return (
    <article className={cn("pt-4 space-y-2 p-4 px-5", className)} aria-labelledby={`product-${item['category_pk']}`}>
      <div className="flex items-start justify-between">
        <h2 id={`product-${item['category_pk']}`} className="sr-only">{item["clothing-name"]}</h2>
        <p className="line-clamp-3 text-md py-1 font-medium leading-[1.125rem]">
          <Link onClick={closeCartPreview} href={`/${item['category_pk'].slice(9)}/${makeSlug(item['clothing-name'])}`} className="router-link-active router-link-exact-active duration hover:underline">
            {item["clothing-name"]}
          </Link>
        </p>
        <button onClick={() => handleRemoveFromCart(item)} type="button" aria-label={`Remove ${item["clothing-name"]}`} className="h-full">
          <Trash2 className="h-4 text-gray-500" />
        </button>
      </div>
      <div className="flex gap-4">
        <Link onClick={closeCartPreview} href={`/${item['category_pk'].slice(9)}/${makeSlug(item['clothing-name'])}`} className="relative router-link-active router-link-exact-active shrink-0 self-start aspect-square h-[6rem] overflow-hidden" data-test-id="thumbnail">
          <Image alt={`${item["clothing-name"]} model`} className='object-cover' src={item["image-url"]} fill />
        </Link>
        <div className="w-full space-y-2">
          <div className="text-gray-700 text-sm" data-test-id="mini-cart-product-variants">
            <p className="line-clamp-1 mb-1">Color: {item.color!.name}</p>
            <p className="line-clamp-1 mb-1">Size: {sizesRef[item.size!]}</p>
            <p className="line-clamp-1 mb-2">Qty: {item.quantity}</p>
          </div>
          <div className="text-sm lh-1 text-sm">
            <span className="gap-x-2 wrap i-flex font-medium">
              <span className="">CAD&nbsp;{item["clothing-price"]}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CartPreviewItem;