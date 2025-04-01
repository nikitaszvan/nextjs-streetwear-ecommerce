"use client";

// External Libraries
import classNames from "classnames";
import { ShoppingBagIcon, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

// Context
import { useCart } from "@/context/cart-context";

// Presentation Layer
import Header from "./header";
import Table from "./table";
import Footer from "./footer";
import { Button } from "@/components/ui/button";

const CartSummary = ({ editable = false, className = "" }) => {
    const {
        cart: { items, totalCartPrice, totalItemCount, cartShippingOption },
        dispatch,
    } = useCart();

    const emptyCart = () => (
        <div className="flex flex-col items-center justify-center px-6 h-full mt-12 mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-3">
                <ShoppingBasketIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md text-center">
                Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild size="lg" className="gap-2 mt-8">
                <Link href="/all-products">
                    <ShoppingBagIcon className="h-5 w-5" />
                    Continue Shopping
                </Link>
            </Button>
        </div>
    );

    return (
        <section className={`${classNames} ${classNames({"md:static": !editable})}`} aria-labelledby="cart-summary-section">
            <div className={classNames({ "max-w-5xl mx-auto": editable })}>
                <Header editable={editable} totalItemCount={totalItemCount} />
                {!!totalCartPrice ? (
                    <>
                        <Table
                            items={items}
                            editable={editable}
                            dispatch={dispatch}
                            cartShippingOption={cartShippingOption}
                            totalCartPrice={totalCartPrice}
                        />
                        {editable && <Footer totalCartPrice={totalCartPrice} />}
                    </>
                ) : emptyCart()}
            </div>
        </section>
    );
};

export default CartSummary;