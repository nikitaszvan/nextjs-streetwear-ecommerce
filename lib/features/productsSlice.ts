interface Product {
    'category_pk': string;
    'clothing-name': string;
    'clothing-price': number;
    'image-type': string;
    'image-url': string;
    'sort_key': string;
    'upload-date': string;
  };
  
  interface ProductState {
    productPayload: {
      [key: string]: Product[];
    };
    loading: boolean;
    error: string | null;
  }

  const categoriesRef: Record<string, string> = {
    "shirts-top-men" : "Tops",
    "outerwear-top-men" : "Outerwear",
    "pants-bottom-men" : "Bottoms",
    "shoes-men" : "Shoes"
  } as const;
  
  // store/features/productSlice.ts
  import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
  import { RootState } from '../store';

  const selectProductsState = (state: RootState) => state.products;

  
  const initialState: ProductState = {
    productPayload: {},
    loading: false,
    error: null,
  };
  
  export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (category: string) => {
      const response = await fetch(`/api/products?category=${category}`);

      return {
        category: categoriesRef[category],
        data: await response.json(),
      };
    }
  );


export const makeSelectCategoryProducts = (category: string) =>
  createSelector(
    [selectProductsState],
    (productsState) => ({
      loading: productsState.loading,
      error: productsState.error,
      products: productsState.productPayload[category] || []
    })
  );
  
  const productSlice = createSlice({
    name: 'productsState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductsByCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
          const { category, data } = action.payload;
          state.productPayload[category] = data;
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchProductsByCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch products';
        });
    },
  });

  export const selectProductsByCategory = (state: RootState, category: string) => 
    state.products.productPayload[category] || [];
  
  export default productSlice.reducer;