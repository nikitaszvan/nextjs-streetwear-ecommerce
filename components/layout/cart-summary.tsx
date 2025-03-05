"use client";

import { useCart } from "@/context/cart-context";
import { CartProductType } from "@/types/cart-types";
import Image from "next/image";
import Link from "next/link";
import { sizesRef } from "@/constants/product-constants";
import classNames from "classnames";
import { makeSlug } from "@/utils/string-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";


const CartSummary = ({ editable = false, className = "" }) => {
    const {
        cart: { items, totalCartPrice, totalItemCount },
        dispatch,
    } = useCart();

    const handleRemoveFromCart = (product: CartProductType) => {
        dispatch({ type: "REMOVE_ITEM", payload: product });
    };

    const handleAddToCart = (product: CartProductType) => {
        dispatch({ type: "ADD_ITEM", payload: product });
    };

    const renderProductDetails = (editable: boolean, item: CartProductType) => {
        const productLink = `/${item['category_pk'].slice(9)}/${makeSlug(item['clothing-name'])}`;

        return (
            <td className="p-2 align-middle font-medium">
                <Link
                    className="transition-colors hover:text-muted-foreground flex flex-col"
                    href={productLink}
                    data-href={productLink}
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
        );
    };

    return (
        <div className={className}>
            <div className={classNames({ "max-w-5xl mx-auto": editable })}>
                <div className="flex gap-3 items-end mb-4">
                    <h1 className="text-3xl font-bold leading-none tracking-tight">
                        {editable ? "Your cart" : "Cart Summary"}
                    </h1>
                    {editable && <span className="text-muted-foreground">({totalItemCount} items)</span>}
                </div>
                <form>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead>
                                <tr className="border-b transition-colors hover:bg-muted/50">
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground hidden w-24 sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th className={classNames("h-10 px-2 text-left align-middle font-medium text-muted-foreground", { "text-lg": editable })}>
                                        Product
                                    </th>
                                    <th className={classNames("h-10 px-2 text-left align-middle font-medium text-muted-foreground", { "text-lg text-center": editable })}>
                                        Price
                                    </th>
                                    <th className={classNames("h-10 px-2 text-left align-middle font-medium text-muted-foreground w-1/6 min-w-32", { "text-lg text-center": editable })}>
                                        Quantity
                                    </th>
                                    <th className={classNames("h-10 px-2 align-middle font-medium text-muted-foreground w-1/6 min-w-32 text-right", { "text-lg": editable })}>
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className={classNames("border-t transition-colors hover:bg-muted/50", { "h-[9rem]": editable })}>
                                        <td className="p-2 align-middle w-[12%]">
                                            <Image
                                                alt=""
                                                src={item["image-url"]}
                                                quality={20}
                                                height={110}
                                                width={110}
                                                className="aspect-square rounded-md mx-auto"
                                            />
                                        </td>
                                        {renderProductDetails(editable, item)}
                                        <td className={classNames("p-2", { "font-lg text-base text-center": editable })}>
                                            {item["clothing-price"]}
                                        </td>
                                        <td className="p-2 align-middle">
                                            <span className={classNames("flex flex-row items-center text-foreground", { "justify-center": editable })}>
                                                {editable && (
                                                    <button
                                                        onClick={() => handleRemoveFromCart(item)}
                                                        className={classNames("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-md group aspect-square p-0", { "text-lg h-12": editable, "text-xs h-8": !editable })}
                                                        type="button"
                                                    >
                                                        <span className={classNames("flex items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white", { "h-8 w-8": editable, "h-4 w-4": !editable })}>
                                                            –
                                                        </span>
                                                    </button>
                                                )}
                                                <span className={classNames("inline-block min-w-8 px-1 text-center tabular-nums", { "text-base": editable })}>
                                                    {item.quantity}
                                                </span>
                                                {editable && (
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        className={classNames("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-md group aspect-square p-0", { "text-lg h-12": editable, "text-xs h-8": !editable })}
                                                        type="button"
                                                    >
                                                        <span className={classNames("flex items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white", { "h-8 w-8": editable, "h-4 w-4": !editable })}>
                                                            +
                                                        </span>
                                                    </button>
                                                )}
                                            </span>
                                        </td>
                                        <td className="p-2 align-middle text-right">
                                            <span className={classNames("whitespace-nowrap tabular-nums text-foreground", { "text-base font-semibold": editable })}>
                                                {Number(item["clothing-price"]) * item.quantity}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {!editable &&
                                <tfoot className="border-t bg-muted/50 font-medium">
                                    <tr className="border-b transition-colors hover:bg-muted/50 text-lg font-bold">
                                        <td className="p-2 align-middle hidden w-24 sm:table-cell"></td>
                                        <td className="p-2 align-middle text-right" colSpan={3}>
                                            {editable && "SUB"}TOTAL
                                        </td>
                                        <td className="p-2 align-middle text-right">
                                            <span className={classNames("relative tabular-nums text-foreground", { "text-lg": editable })}>
                                                CAD {totalCartPrice}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            }
                        </table>
                        {editable &&
                            <div className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span className="font-medium">CAD {totalCartPrice}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span className="font-medium">Calculated at checkout</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between text-lg font-semibold">
                                                <span>Total</span>
                                                <span>CAD {totalCartPrice}</span>
                                            </div>
                                            <Link href="/checkout">
                                                <Button className="w-full my-2" size="lg">
                                                    Confirm Cart
                                                </Button>
                                            </Link>
                                            <Link href="/all-products">
                                                <Button variant="outline" className="w-full my-2" size="lg">
                                                    Continue Shopping
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CartSummary;