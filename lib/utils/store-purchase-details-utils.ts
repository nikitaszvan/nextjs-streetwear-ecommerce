// Service Layer
import { generateConfirmationNumber } from "./string-utils";

// External Libraries
import { Dispatch, SetStateAction } from "react";
// Types
import { ShippingOptionType } from "@/types/stripe-element-types";
import { CartProductType, CartAction } from "@/types/cart-types";

export type StoreOrderDataParams = {
    response: {shipping: unknown};
    cartShippingOption: ShippingOptionType | null;
    idempotencyKey: string | undefined;
    items: CartProductType[];
    totalCartPrice: number;
    dispatch: Dispatch<CartAction>;
    setClearData: Dispatch<SetStateAction<boolean>>;
};

export const storePurchaseDetails = ({
    response,
    cartShippingOption,
    idempotencyKey,
    items,
    totalCartPrice,
    dispatch,
    setClearData,
}: StoreOrderDataParams) => {
    if (cartShippingOption !== null && idempotencyKey !== undefined) {
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
            });
        }, 500);
    }
}