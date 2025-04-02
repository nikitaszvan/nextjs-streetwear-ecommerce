// External Libraries
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

// Service Layer
import { makeSlug } from "@/lib/utils/string-utils";

// Constants
import { sizesRef } from "@/constants/product-constants";

// Types
import { CartAction, CartProductType } from "@/types/cart-types";
import { Dispatch } from "react";

type ItemRowParams = {
  item: CartProductType;
  editable: boolean;
  dispatch: Dispatch<CartAction>;
};

const TableItemRow = ({
  item,
  editable,
  dispatch
}: ItemRowParams) => {
  const handleRemoveFromCart = (product: CartProductType) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };

  const handleAddToCart = (product: CartProductType) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const productLink = `/${item['category_pk'].slice(9)}/${makeSlug(item['clothing-name'])}`;

  return (
    <tr className={classNames("border-t transition-colors hover:bg-muted/50 bg-white z-10", { "h-[9rem]": editable })} aria-labelledby={`product-${item['category_pk']}`}>
      <td className="p-2 align-middle hidden sm:block">
        <div className="w-full aspect-square relative">
          <Image
            alt={`${item["clothing-name"]} image`}
            src={item["image-url"]}
            quality={20}
            className="rounded-md mx-auto overflow-hidden object-cover"
            fill
          />
        </div>
      </td>
      <td className={classNames("p-2 align-middle font-medium")}>
        <Link
          className="transition-colors hover:text-muted-foreground flex flex-col"
          href={productLink}
          data-href={productLink}
          aria-label={`View details for ${item["clothing-name"]}`}
        >
          {editable ? (
            <>
              <span className="font-semibold text-base">{item["clothing-name"]}</span>
              <span className="font-normal text-sm">Colour: {item.color!.name}</span>
              <span className="font-normal text-sm">Size: {sizesRef[item.size!]}</span>
            </>
          ) : (
            <>
              <span>{item["clothing-name"]}</span>
              <span className="font-light">{item.color!.name}, {item.size!}</span>
            </>
          )}
        </Link>
      </td>
      <td className={classNames("p-2", { "font-lg md:text-base text-center": editable })}>
        {item["clothing-price"]}
      </td>
      <td className="p-2 align-middle">
        <span className="flex flex-row items-center text-foreground justify-center">
          {editable && (
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="cart-quantity-button group"
              type="button"
              aria-label={`Decrease quantity of ${item["clothing-name"]}`}
            >
              <span className="cart-quantity-span">
                –
              </span>
            </button>
          )}
          <span className={classNames("inline-block px-1 text-center tabular-nums", { "md:text-base": editable })}>
            {item.quantity}
          </span>
          {editable && (
            <button
              onClick={() => handleAddToCart(item)}
              className="cart-quantity-button group"
              type="button"
              aria-label={`Increase quantity of ${item["clothing-name"]}`}
            >
              <span className="cart-quantity-span">
                +
              </span>
            </button>
          )}
        </span>
      </td>
      <td className="p-2 align-middle text-right">
        <span className={classNames("whitespace-nowrap tabular-nums text-foreground", { "md:text-base font-semibold": editable })}>
          {Number(item["clothing-price"]) * item.quantity}
        </span>
      </td>
    </tr>
  );  
};

export default TableItemRow;