"use client"

import { useCart } from "@/context/cart-context";
import { CartProductType } from "@/types/cart-types";
import Image from "next/image";
import { sizesRef } from "@/constants/product-constants";

const CartSummary = () => {
    const { cart: { items, isCartPreviewVisible, totalCartPrice, justAddedProduct } } = useCart();
    const { dispatch } = useCart();

    const handleRemoveFromCart = (product: CartProductType) => {
        dispatch({ type: 'REMOVE_ITEM', payload: product });
    };

    const handleAddToCart = (product: CartProductType) => {
        dispatch({ type: 'ADD_ITEM', payload: product })
    }

    return (
        <div className="my-8 xl:col-span-7">
            <div className="sticky top-1">
                <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight">Your cart</h1>
                <form>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">

                                <tr className="border-b transition-colors hover:bg-muted/50">
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground hidden w-24 sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Product</th>
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Price</th>
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground w-1/6 min-w-32">Quantity</th>
                                    <th className="h-10 px-2 align-middle font-medium text-muted-foreground w-1/6 min-w-32 text-right">Total</th>
                                </tr>

                            </thead>
                            <tbody className="[&amp;_tr:last-child]:border-0">
                                {items.map((item, index) => {
                                    return (
                                        <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] hidden sm:table-cell sm:w-24">
                                                <Image alt="" src={item["image-url"]} width={96} height={96} quality={20} className="aspect-square rounded-md"/>
                                            </td>
                                            <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] font-medium">
                                                <a className="transition-colors hover:text-muted-foreground flex flex-col" href="/product/horizon-gaze-sunglasses">
                                                    <span>{item["clothing-name"]}</span>
                                                    <span className="font-light">{item.color!.name}, {item.size!}</span>
                                                    {/* <span className="font-light">{item.size!}</span> */}
                                                </a>
                                            </td>
                                            <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">CAD {item["clothing-price"]}</td>
                                            <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px]">
                                                <span className="flex flex-row items-center text-foreground">
                                                    <button onClick={() => handleRemoveFromCart(item)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md text-xs group aspect-square p-0" type="button">
                                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white">–</span>
                                                    </button>
                                                    <span className="inline-block min-w-8 px-1 text-center tabular-nums">{item.quantity}</span>
                                                    <button onClick={() => handleAddToCart(item)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md text-xs group aspect-square p-0" type="button" >
                                                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white">+</span>
                                                    </button>
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle [&amp;:has([role=checkbox])]:pr-0 [&amp;>[role=checkbox]]:translate-y-[2px] text-right"><span className="whitespace-nowrap tabular-nums text-foreground">CAD {Number(item["clothing-price"])*item.quantity}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot className="border-t bg-muted/50 font-medium">
                                <tr className="border-b transition-colors hover:bg-muted/50 text-lg font-bold">
                                    <td className="p-2 align-middle hidden w-24 sm:table-cell"></td>
                                    <td className="p-2 align-middle text-right" colSpan={3}>TOTAL</td>
                                    <td className="p-2 align-middle text-right">
                                        <span className="relative tabular-nums text-foreground">CAD {totalCartPrice}</span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CartSummary;