import { useGetProductsByCategoryQuery } from '@/lib/api/products-api';

const categories = [
  "shirts-top-men",
  "outerwear-top-men",
  "pants-bottom-men",
  "shoes-men"
] as const;

export function useProducts(category: string, shouldFetch: boolean, random?: boolean) {
  let products = [];
  let isLoading = false;
  let isError = false;
  let error = null;
  let refetch = () => {};
  let randomProduct = null;

  if (category === "all-products") {
    // Handle fetching all categories
    const queries = categories.map(cat => 
      useGetProductsByCategoryQuery(cat, {
        skip: !shouldFetch,
        pollingInterval: 5 * 60 * 1000,
        refetchOnReconnect: true,
      })
    );

    // Combine results
    isLoading = queries.some(query => query.isLoading);
    isError = queries.some(query => query.isError);
    error = queries.find(query => query.error)?.error || null;
    
    // Combine all products
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
      pollingInterval: 5 * 60 * 1000,
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