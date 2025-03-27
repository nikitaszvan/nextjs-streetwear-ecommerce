// External Libraries
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (category) => ({
        url: '/get-products-dynamodb',
        params: { category }
      }),
      providesTags: ['Products']
    }),
    addProduct: builder.mutation({
        query: (newProduct) => ({
          url: 'products',
          method: 'POST',
          body: newProduct,
        }),
        invalidatesTags: ['Products'],
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsApi;