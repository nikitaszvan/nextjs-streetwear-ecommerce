import { useGetProductsByCategoryQuery } from '@/lib/api/products-api';

export function useProducts(category: string, shouldFetch: boolean) {
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

  return {
    products,
    isLoading,
    isError,
    error,
    refetch
  };
}