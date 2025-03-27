// Service Layer
import { generateConfirmationNumber } from "./string-utils";

// External Libraries
import { Dispatch, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Types
import { ShippingOptionType } from "@/types/stripe-element-types";
import { CartProductType, CartAction } from "@/types/cart-types";

type StoreOrderDataParams = {
    response: any;
    cartShippingOption: ShippingOptionType | null;
    idempotencyKey: string;
    items: CartProductType[];
    totalCartPrice: number;
    dispatch: Dispatch<CartAction>;
    setClearData: Dispatch<SetStateAction<boolean>>;
    router: AppRouterInstance;
};

export const storePurchaseDetails = ({
    response,
    cartShippingOption,
    idempotencyKey,
    items,
    totalCartPrice,
    dispatch,
    setClearData,
    router,
}: StoreOrderDataParams) => {
    if (cartShippingOption !== null) {
        localStorage.setItem(
            idempotencyKey,
            JSON.stringify({
                confirmation_number: generateConfirmationNumber(),
                order_date: new Date(),
                purchaseItems: items,
                customerAddress: response.shipping,
                subTotal: totalCartPrice,
                cartShippingOption: cartShippingOption,
            })
        );
        router.push(`/payment-success?key=${idempotencyKey}`);
        dispatch({ type: "CLEAR_CART" });
        sessionStorage.removeItem('userAddressFields');
        sessionStorage.removeItem('userEmailFields');
        sessionStorage.removeItem('userShippingOptionFields');
        setClearData(true);
    } else {
        setTimeout(() => {
            storePurchaseDetails({
                response,
                cartShippingOption,
                idempotencyKey,
                items,
                totalCartPrice,
                dispatch,
                setClearData,
                router,
            });
        }, 500);
    }
}