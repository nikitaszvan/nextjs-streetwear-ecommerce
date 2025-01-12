import { useGetProductsByCategoryQuery } from '@/lib/api/products-api';

export function useProducts(category: string, shouldFetch: boolean, random?: boolean) {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch
  } = useGetProductsByCategoryQuery(category, {
    skip: !shouldFetch,
    pollingInterval: 5 * 60 * 1000,
    refetchOnReconnect: true,
  });

  let randomProduct = null;
  
  if (random && products && products.length > 0) {
    randomProduct = products[Math.floor(Math.random() * products.length)];
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