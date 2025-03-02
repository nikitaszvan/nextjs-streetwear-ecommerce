"use client"

import { useCart } from "@/context/cart-context";
import { CartProductType } from "@/types/cart-types";
import Image from "next/image";
import Link from "next/link";

const CartSummary = ({
    editable,
    className
}: {
    editable?: boolean;
    className?: string
}) => {
    const { cart: { items, totalCartPrice } } = useCart();
    const { dispatch } = useCart();

    const handleRemoveFromCart = (product: CartProductType) => {
        dispatch({ type: 'REMOVE_ITEM', payload: product });
    };

    const handleAddToCart = (product: CartProductType) => {
        dispatch({ type: 'ADD_ITEM', payload: product })
    }

    return (
        <div className={className && className}>
            <div className={!editable ? "sticky top-1" : ""}>
                <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight">{editable ? "Your cart" : "Cart Summary"}</h1>
                <form>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&amp;_tr]:border-b">

                                <tr className="border-b transition-colors hover:bg-muted/50">
                                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground hidden w-24 sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </th>
                                    <th className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground ${editable && 'text-lg'}`}>Product</th>
                                    <th className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground ${editable && 'text-lg'}`}>Price</th>
                                    <th className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground w-1/6 min-w-32 ${editable && 'text-lg'}`}>Quantity</th>
                                    <th className={`h-10 px-2 align-middle font-medium text-muted-foreground w-1/6 min-w-32 text-right ${editable && 'text-lg'}`}>Total</th>
                                </tr>

                            </thead>
                            <tbody className="">
                                {items.map((item, index) => {
                                    return (
                                        <tr key={index} className={`border-b transition-colors hover:bg-muted/50 ${editable && 'h-[10rem]'}`}>
                                            <td className="relative p-2 align-middle aspect-square">
                                                <Image alt="" src={item["image-url"]} quality={20} className="aspect-square rounded-md" fill/>
                                            </td>
                                            <td className="p-2 align-middle font-medium">
                                                <Link className="transition-colors hover:text-muted-foreground flex flex-col" href="/product/horizon-gaze-sunglasses">
                                                    <span>{item["clothing-name"]}</span>
                                                    <span className="font-light">{item.color!.name}, {item.size!}</span>
                                                    {/* <span className="font-light">{item.size!}</span> */}
                                                </Link>
                                            </td>
                                            <td className="p-2 align-middle">CAD {item["clothing-price"]}</td>
                                            <td className="p-2 align-middle">
                                                <span className="flex flex-row items-center text-foreground">
                                                    {editable &&
                                                        <button onClick={() => handleRemoveFromCart(item)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md text-xs group aspect-square p-0" type="button">
                                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white">–</span>
                                                        </button>
                                                    }
                                                    <span className="inline-block min-w-8 px-1 text-center tabular-nums">{item.quantity}</span>
                                                    {editable &&
                                                        <button onClick={() => handleAddToCart(item)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md text-xs group aspect-square p-0" type="button" >
                                                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 pb-0.5 font-bold leading-none text-black transition-colors group-hover:bg-neutral-500 group-hover:text-white">+</span>
                                                        </button>
                                                    }
                                                </span>
                                            </td>
                                            <td className="p-2 align-middle text-right"><span className="whitespace-nowrap tabular-nums text-foreground">CAD {Number(item["clothing-price"]) * item.quantity}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot className="border-t bg-muted/50 font-medium">
                                <tr className="border-b transition-colors hover:bg-muted/50 text-lg font-bold">
                                    <td className="p-2 align-middle hidden w-24 sm:table-cell"></td>
                                    <td className="p-2 align-middle text-right" colSpan={3}>{editable && 'SUB'}TOTAL</td>
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