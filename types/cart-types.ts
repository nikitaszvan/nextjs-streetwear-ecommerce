import { ReactNode, Context } from "react";
import { ProductType } from "./product-types";

export type CartProductType = ProductType & {
    'unique-identifier': string;
    'quantity': number;
}
  
export interface CartState {
    items: CartProductType[];
    isCartPreviewVisible: boolean;
    totalItemCount: number;
};

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartProductType }
  | { type: 'REMOVE_ITEM'; payload: CartProductType }
  | { type: 'CLEAR_CART' }
  | { type: 'SHOW_CART_PREVIEW' }
  | { type: 'HIDE_CART_PREVIEW' }
  | { type: 'SET_ITEMS'; payload: CartProductType[] }

export type CartContextProps = {
    cart: CartState;
    dispatch: React.Dispatch<CartAction>;
}

export type CartProviderProps = {
    children: ReactNode;
}

export type CartContextType = Context<CartContextProps>;
