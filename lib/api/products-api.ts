import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (category) => ({
        url: '/products',
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
        invalidatesTags: ['Products'], // Automatically refetch products after adding new one
    }),
  }),
});

export const { useGetProductsByCategoryQuery } = productsApi;