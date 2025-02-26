import { useGetProductsByCategoryQuery } from '@/lib/api/products-api';
import { categories } from '@/constants/product-constants';

type UseProductsParamsType = {
  category: string;
  shouldFetch: boolean;
  random?: boolean;
}

export const useProducts = ({ category, shouldFetch, random }: UseProductsParamsType) => {
  let products = [];
  let isLoading = false;
  let isError = false;
  let error = null;
  let refetch = () => { };
  let randomProduct = null;

  if (category === "all-products") {
    const queries = categories.map(cat =>
      useGetProductsByCategoryQuery(cat, {
        skip: !shouldFetch,
        refetchOnReconnect: true,
      })
    );

    isLoading = queries.some(query => query.isLoading);
    isError = queries.some(query => query.isError);
    error = queries.find(query => query.error)?.error || null;

    queries.forEach(query => {
      if (query.data) {
        products.push(...query.data);
      }
    });

    refetch = () => {
      queries.forEach(query => query.refetch());
    };
  } else {

    const query = useGetProductsByCategoryQuery(category, {
      skip: !shouldFetch,
      refetchOnReconnect: true,
    });

    isLoading = query.isLoading;
    isError = query.isError;
    error = query.error;
    refetch = query.refetch;
    products = query.data || [];

    if (random && products.length > 0) {
      randomProduct = products[Math.floor(Math.random() * products.length)];
    }
  }


  return {
    randomProduct,
    products,
    isLoading,
    isError,
    error,
    refetch
  };
}