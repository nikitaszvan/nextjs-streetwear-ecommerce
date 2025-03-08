import { ReactNode, Context } from "react";
import { ProductType } from "./product-types";

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

export type CartShippingOptionType = {
    option: string;
    minimumDays: number;
    maximumDays: number;
    price: number;
}

export interface CartState {
    items: CartProductType[];
    isCartPreviewVisible: boolean;
    justAddedProduct: boolean;
    cartShippingOption: CartShippingOptionType | null;
    totalItemCount: number;
    totalCartPrice: number;
};

export type CartAction =
    | { type: 'ADD_ITEM'; payload: CartProductType }
    | { type: 'REMOVE_ITEM'; payload: CartProductType }
    | { type: 'CLEAR_CART' }
    | { type: 'SHOW_CART_PREVIEW'; payload: boolean } // payload boolean is if cart is opened by something being added
    | { type: 'HIDE_CART_PREVIEW' }
    | { type: 'SET_ITEMS'; payload: CartProductType[] }
    | { type: 'ADD_SHIPPING_TO_CART'; payload: CartShippingOptionType }
    

export type CartContextProps = {
    cart: CartState;
    dispatch: React.Dispatch<CartAction>;
    isLoading: boolean;
}

export type CartProviderProps = {
    children: ReactNode;
}

export type CartContextType = Context<CartContextProps>;
