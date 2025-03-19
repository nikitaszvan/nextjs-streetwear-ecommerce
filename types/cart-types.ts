import { ReactNode, Context } from "react";
import { ProductType } from "./product-types";
import { ShippingOptionType, StripeShippingAddressType } from "./stripe-element-types";

export type ColorType = {
    name: string;
    rgba: string
};

export type ProductVariantType = {
    size: string | null;
    color: ColorType | null;
}

export type CartProductType = ProductType & {
    'unique-identifier': string;
    quantity: number;
} & ProductVariantType


export type StripeSessionType = {
    paymentId: string;
    clientSecret: string;
}

export interface CartState {
    items: CartProductType[];
    isCartPreviewVisible: boolean;
    justAddedProduct: boolean;
    cartShippingOption: ShippingOptionType | null;
    totalItemCount: number;
    totalCartPrice: number;
    activeStripeSession: StripeSessionType | null;
};

export type CartAction =
    | { type: 'ADD_ITEM'; payload: CartProductType }
    | { type: 'REMOVE_ITEM'; payload: CartProductType }
    | { type: 'CLEAR_CART' }
    | { type: 'SHOW_CART_PREVIEW'; payload: boolean } // payload boolean is if cart is opened by something being added
    | { type: 'HIDE_CART_PREVIEW' }
    | { type: 'SET_ITEMS'; payload: CartProductType[] }
    | { type: 'ADD_SHIPPING_TO_CART'; payload: ShippingOptionType | null }
    | { type: 'ADD_STRIPE_SESSION'; payload: StripeSessionType | null }


export type CartContextProps = {
    cart: CartState;
    dispatch: React.Dispatch<CartAction>;
    isLoading: boolean;
}

export type CartProviderProps = {
    children: ReactNode;
}

export type CartContextType = Context<CartContextProps>;
