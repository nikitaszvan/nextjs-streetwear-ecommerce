"use client";

import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import {
  CartState,
  CartAction,
  CartContextProps,
  CartProviderProps,
  CartContextType,
  CartProductType
} from '@/types/cart-types';

const initialState: CartState = {
  items: [],
  isCartPreviewVisible: false,
  totalItemCount: 0,
  totalCartPrice: 0
};

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ecommerceDB', 1);

    request.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart');
      }
      if (!db.objectStoreNames.contains('metadata')) {
        db.createObjectStore('metadata');
      }
    };

    request.onsuccess = function (event) {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = function (event) {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const addToIndexedDB = async (item: CartProductType): Promise<void> => {
  return openDatabase().then(db => {
    const transaction = db.transaction('cart', 'readwrite');
    const store = transaction.objectStore('cart');
    console.log(item);
    store.put(item, item['unique-identifier']);
  });
};

const removeFromIndexedDB = async (itemId: string): Promise<void> => {
  return openDatabase().then(db => {
    const transaction = db.transaction('cart', 'readwrite');
    const store = transaction.objectStore('cart');
    store.delete(itemId);
  });
};

const clearIndexedDB = (): Promise<void> => {
  return openDatabase().then(db => {
    const transaction = db.transaction('cart', 'readwrite');
    const store = transaction.objectStore('cart');
    store.clear();
  });
};

const updateTotalItemCountInDB = async (count: number): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction('metadata', 'readwrite');
  const store = transaction.objectStore('metadata');
  store.put(count, 'totalItemCount');
};

const updateTotalPriceInDB = async (price: number): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction('metadata', 'readwrite');
  const store = transaction.objectStore('metadata');
  store.put(price, 'totalPrice');
};

const getTotalItemCountFromDB = async (): Promise<number> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('metadata', 'readonly');
    const store = transaction.objectStore('metadata');
    const request = store.get('totalItemCount');

    request.onsuccess = function () {
      resolve(request.result || 0);
    };

    request.onerror = function (event) {
      reject((event.target as IDBRequest).error);
    };
  });
};

const getTotalPriceFromDB = async (): Promise<number> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('metadata', 'readonly');
    const store = transaction.objectStore('metadata');
    const request = store.get('totalPrice');

    request.onsuccess = function () {
      resolve(request.result || 0);
    };

    request.onerror = function (event) {
      reject((event.target as IDBRequest).error);
    };
  });
};

const loadCartFromIndexedDB = async (): Promise<CartProductType[]> => {
  return openDatabase().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('cart', 'readonly');
      const store = transaction.objectStore('cart');
      const request = store.getAll();


      request.onsuccess = function () {
        resolve(request.result as CartProductType[]);
      };

      request.onerror = function (event) {
        reject((event.target as IDBRequest).error);
      };
    });
  });
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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        newState = {
          ...state,
          items: updatedItems,
          totalItemCount: state.totalItemCount + 1,
          totalCartPrice: state.totalCartPrice + Number(action.payload['clothing-price'])
        };

        addToIndexedDB({
          ...state.items[existingItemIndex],
          quantity: state.items[existingItemIndex].quantity + 1,
        });

      } else {
        const newItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
        };

        newState = {
          ...state,
          items: [...state.items, newItem],
          totalItemCount: state.totalItemCount + action.payload.quantity,
          totalCartPrice: state.totalCartPrice + Number(action.payload['clothing-price']) * action.payload.quantity
        };

        addToIndexedDB(newItem);
      }

      updateTotalItemCountInDB(newState.totalItemCount);
      updateTotalPriceInDB(newState.totalItemCount);
      console.log(newState.totalItemCount);
      return newState;

    case 'REMOVE_ITEM':
      const existingCartItemIndex = state.items.findIndex(
        item => item['unique-identifier'] === action.payload['unique-identifier']
      );

      if (existingCartItemIndex !== -1) {
        const existingItem = state.items[existingCartItemIndex];

        if (existingItem.quantity > 1) {
          const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
          const newItems = state.items.map((item, index) =>
            index === existingCartItemIndex ? updatedItem : item
          );

          newState = {
            ...state,
            items: newItems,
            totalItemCount: state.totalItemCount - 1,
          };

          addToIndexedDB(updatedItem);
        } else {
          newState = {
            ...state,
            items: state.items.filter(item => item['unique-identifier'] !== action.payload['unique-identifier']),
            totalItemCount: state.totalItemCount - 1
          };

          removeFromIndexedDB(action.payload['unique-identifier']);
        }
      } else {
        newState = state;
      }

      updateTotalItemCountInDB(newState.totalItemCount);

      newState = {
        ...newState,
        totalCartPrice: newState.totalCartPrice - Number(action.payload['clothing-price'])
      };

      updateTotalPriceInDB(newState.totalCartPrice);

      return newState;

    case 'CLEAR_CART':
      newState = {
        ...initialState,
        isCartPreviewVisible: state.isCartPreviewVisible,
      };

      clearIndexedDB();
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
  isLoading: true
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCartFromIndexedDB().then(items => {
      items.forEach(item => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    }).then(() => {
      getTotalItemCountFromDB();
      getTotalPriceFromDB();
      setIsLoading(false)
    });
  }, []);

  const value = {
    cart: state,
    dispatch,
    isLoading
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