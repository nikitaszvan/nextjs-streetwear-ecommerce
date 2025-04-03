"use client";

// External Libraries
import { createContext, useContext, useReducer, useEffect, useState } from 'react';

// Types
import {
  CartState,
  CartAction,
  CartContextParams,
  CartProviderParams,
  CartContextType,
  CartProductType,
} from '@/types/cart-types';

const initialState: CartState = {
  items: [],
  isCartPreviewVisible: false,
  justAddedProduct: false,
  cartShippingOption: null,
  totalItemCount: 0,
  totalCartPrice: 0,
  activeStripeSession: null
};

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ecommerceDB', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('cart')) {
        // Use 'unique-identifier' as the keyPath
        db.createObjectStore('cart');
      }
      if (!db.objectStoreNames.contains('metadata')) {
        db.createObjectStore('metadata');
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

const addToIndexedDB = async (item: CartProductType): Promise<void> => {
  try {
    if (!item['unique-identifier']) {
      throw new Error('Item is missing unique-identifier');
    }
    const db = await openDatabase();
    const transaction = db.transaction('cart', 'readwrite');
    const store = transaction.objectStore('cart');
    store.put(item, item['unique-identifier']);
  } catch (error) {
    console.error('Error adding item to IndexedDB:', error);
  }
};

const removeFromIndexedDB = async (itemId: string): Promise<void> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('cart', 'readwrite');
    const store = transaction.objectStore('cart');
    store.delete(itemId);
  } catch (error) {
    console.error('Error removing item from IndexedDB:', error);
  }
};

const clearIndexedDB = async (): Promise<void> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['cart', 'metadata'], 'readwrite');
    transaction.objectStore('cart').clear();
    transaction.objectStore('metadata').clear();
  } catch (error) {
    console.error('Error clearing IndexedDB:', error);
  }
};

const updateMetadataInDB = async (key: string, value: any): Promise<void> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('metadata', 'readwrite');
    const store = transaction.objectStore('metadata');
    store.add(value, key);
  } catch (error) {
    console.error(`Error updating ${key} in IndexedDB:`, error);
  }
};

const getMetadataFromDB = async (key: string): Promise<any> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('metadata', 'readonly');
    const store = transaction.objectStore('metadata');
    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  } catch (error) {
    console.error(`Error getting ${key} from IndexedDB:`, error);
    return null;
  }
};

const loadCartFromIndexedDB = async (): Promise<CartProductType[]> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('cart', 'readonly');
    const store = transaction.objectStore('cart');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result as CartProductType[]);
      };
      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  } catch (error) {
    console.error('Error loading cart from IndexedDB:', error);
    return [];
  }
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

        addToIndexedDB(updatedItems[existingItemIndex]);

      } else {
        const newItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
        };

        newState = {
          ...state,
          items: [...state.items, newItem],
          totalItemCount: state.totalItemCount + newItem.quantity,
          totalCartPrice: state.totalCartPrice + Number(newItem['clothing-price']) * newItem.quantity
        };

        addToIndexedDB(newItem);
      }

      updateMetadataInDB('totalItemCount', newState.totalItemCount);
      updateMetadataInDB('totalPrice', newState.totalCartPrice);
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

      updateMetadataInDB('totalItemCount', newState.totalItemCount);
      newState = {
        ...newState,
        totalCartPrice: newState.totalCartPrice - Number(action.payload['clothing-price'])
      };

      updateMetadataInDB('totalPrice', newState.totalCartPrice);
      return newState;

    case 'CLEAR_CART':
      newState = {
        ...initialState,
      };

      clearIndexedDB();
      return newState;

    case 'SHOW_CART_PREVIEW':
      newState = {
        ...state,
        isCartPreviewVisible: true,
        justAddedProduct: action.payload
      };
      return newState;

    case 'HIDE_CART_PREVIEW':
      newState = {
        ...state,
        isCartPreviewVisible: false,
      };
      return newState;

    case 'ADD_SHIPPING_TO_CART':
      newState = {
        ...state,
        cartShippingOption: action.payload
      };

      updateMetadataInDB('shippingOption', action.payload);
      return newState;

    case 'ADD_STRIPE_SESSION':
      newState = {
        ...state,
        activeStripeSession: action.payload
      };

      updateMetadataInDB('stripeSession', action.payload);
      return newState;

    default:
      return state;
  }
};

export const CartContext: CartContextType = createContext<CartContextParams>({
  cart: initialState,
  dispatch: () => null,
  isLoading: true
});

export const CartProvider = ({ children }: CartProviderParams) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const items = await loadCartFromIndexedDB();
        items.forEach(item => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      } catch (error) {
        console.error('Error loading items from IndexedDB:', error);
      }
  
      try {
        const totalItemCount = await getMetadataFromDB('totalItemCount');
      } catch (error) {
        console.error('Error getting total item count from DB:', error);
      }
  
      try {
        const totalPrice = await getMetadataFromDB('totalPrice');
      } catch (error) {
        console.error('Error getting total price from DB:', error);
      }
  
      try {
        const shippingOption = await getMetadataFromDB('shippingOption');
        if (shippingOption) {
          dispatch({ type: 'ADD_SHIPPING_TO_CART', payload: shippingOption });
        }
      } catch (error) {
        console.error('Error getting shipping option from DB:', error);
      }
  
      try {
        const stripeSession = await getMetadataFromDB('stripeSession');
        if (stripeSession) {
          dispatch({ type: 'ADD_STRIPE_SESSION', payload: stripeSession });
        }
      } catch (error) {
        console.error('Error getting stripe session from DB:', error);
      }
  
      setIsLoading(false);
    };
  
    initializeCart();
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

export const useCart = (): CartContextParams => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};