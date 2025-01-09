import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './api/products-api';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['products'], // Only persist products reducer
// };

// const persistedReducer = persistReducer(persistConfig, productsReducer);

// export const store = configureStore({
//   reducer: {
//     products: persistedReducer,
//   },
// });

// export const persistor = persistStore(store);

export const store = () => {
  const storeConfig =  configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer
        // cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
  });

  setupListeners(storeConfig.dispatch);

  return storeConfig;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];