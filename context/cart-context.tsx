"use client";

import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import {
  CartState,
  CartAction,
  CartContextProps,
  CartProviderProps,
  CartContextType,
  CartProductType,
} from '@/types/cart-types';

import { ShippingOptionType } from '@/types/stripe-element-types';

const initialState: CartState = {
  items: [],
  isCartPreviewVisible: false,
  justAddedProduct: false,
  cartShippingOption: null,
  totalItemCount: 0,
  totalCartPrice: 0,
  activeStripeSession: null
};

import { StripeSessionType } from '@/types/cart-types';

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ecommerceDB', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('cart')) {
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
  return openDatabase().then(db => {
    const transaction = db.transaction('cart', 'readwrite');
    const store = transaction.objectStore('cart');
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
    return new Promise((resolve, reject) => {
      // Create a transaction that includes both 'cart' and 'metadata' object stores
      const transaction = db.transaction(['cart', 'metadata'], 'readwrite');

      // Clear the 'cart' object store
      const cartStore = transaction.objectStore('cart');
      const cartClearRequest = cartStore.clear();

      // Clear the 'metadata' object store
      const metadataStore = transaction.objectStore('metadata');
      const metadataClearRequest = metadataStore.clear();

      // Handle success and error for both clear operations
      cartClearRequest.onsuccess = () => {
        console.log('Cart cleared successfully.');
      };

      metadataClearRequest.onsuccess = () => {
        console.log('Metadata cleared successfully.');
      };

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = (event) => {
        reject('Transaction error: ' + (event.target as IDBTransaction).error?.message);
      };
    });
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

const updateStripeSessionInDB = async (sessionInfo: StripeSessionType): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction('metadata', 'readwrite');
  const store = transaction.objectStore('metadata');
  store.put(sessionInfo, 'stripeSession');
};

const updateShippingOptionInDB = async (shipping: ShippingOptionType): Promise<void> => {
  const db = await openDatabase();
  const transaction = db.transaction('metadata', 'readwrite');
  const store = transaction.objectStore('metadata');
  store.put(shipping, 'shippingOption');
};

const getTotalItemCountFromDB = async (): Promise<number> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('metadata', 'readonly');
    const store = transaction.objectStore('metadata');
    const request = store.get('totalItemCount');

    request.onsuccess = () => {
      resolve(request.result || 0);
    };

    request.onerror = (event) => {
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

    request.onsuccess = () => {
      resolve(request.result || 0);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

const getShippingOptionFromDB = async (): Promise<ShippingOptionType | null> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('metadata', 'readonly');
    const store = transaction.objectStore('metadata');
    const request = store.get('shippingOption');

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
};

const getStripeSessionFromDB = async (): Promise<StripeSessionType | null> => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('metadata', 'readonly');
    const store = transaction.objectStore('metadata');
    const request = store.get('stripeSession');

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = (event) => {
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


      request.onsuccess = () => {
        resolve(request.result as CartProductType[]);
      };

      request.onerror = (event) => {
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
      updateTotalPriceInDB(newState.totalCartPrice);
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
      };

      clearIndexedDB().then(() => {
        console.log('IndexedDB cart cleared successfully.');
      }).catch(error => {
        console.error('Error clearing IndexedDB cart:', error);
      });
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

    default:
      return state;

    case 'ADD_SHIPPING_TO_CART':
      newState = {
        ...state,
        cartShippingOption: action.payload
      }

      updateShippingOptionInDB(action.payload!);

      return newState;

    case 'ADD_STRIPE_SESSION':
      newState = {
        ...state,
        activeStripeSession: action.payload
      }

      updateStripeSessionInDB(action.payload!);

      return newState;
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
    }).then(async () => {
      getTotalItemCountFromDB();
      getTotalPriceFromDB();
      const shippingOption = await getShippingOptionFromDB();
      const stripeSession = await getStripeSessionFromDB();


      dispatch({ type: 'ADD_SHIPPING_TO_CART', payload: shippingOption });
      dispatch({ type: 'ADD_STRIPE_SESSION', payload: stripeSession });

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