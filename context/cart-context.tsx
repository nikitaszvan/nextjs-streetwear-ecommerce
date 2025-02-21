"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartState, CartAction, CartContextProps, CartProviderProps, CartContextType } from '@/types/cart-types';

const initialState = {
  items: [],
  isCartPreviewVisible: false,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {

  let newState: CartState;

  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item['unique-identifier'] === action.payload['unique-identifier']
      );

      if (existingItemIndex !== -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );

        newState = {
          ...state,
          items: updatedItems,
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      return newState;

    case 'REMOVE_ITEM':
      newState = {
        ...state,
        items: state.items.filter(item => item['unique-identifier'] !== action.payload.id),
      };
      return newState;

    case 'CLEAR_CART':
      newState = {
        ...initialState,
        isCartPreviewVisible: state.isCartPreviewVisible,
      };
      return newState;

    case 'SHOW_CART_PREVIEW':
      newState = {
        ...state,
        isCartPreviewVisible: true,
      };
      return newState;

    case 'HIDE_CART_PREVIEW':
      newState = {
        ...state,
        isCartPreviewVisible: false,
      };
      return newState;

    default:
      return state;
  }
};

  export const CartContext: CartContextType = createContext<CartContextProps>({
    cart: initialState,
    dispatch: () => null,
  });
  
  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
    const value = {
      cart: state,
      dispatch,
    };
  
    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };