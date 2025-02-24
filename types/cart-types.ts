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

export interface CartState {
    items: CartProductType[];
    isCartPreviewVisible: boolean;
    justAddedProduct: boolean;
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

export type CartContextProps = {
    cart: CartState;
    dispatch: React.Dispatch<CartAction>;
    isLoading: boolean;
}

export type CartProviderProps = {
    children: ReactNode;
}

export type CartContextType = Context<CartContextProps>;
