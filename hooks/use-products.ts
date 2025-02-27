import { useGetProductsByCategoryQuery } from '@/lib/api/products-api';
import { categories } from '@/constants/product-constants';
import { ProductType } from '@/types/product-types';

type UseProductsParamsType = {
  category: string;
  shouldFetch: boolean;
  random?: boolean;
}

export const useProducts = ({ category, shouldFetch, random }: UseProductsParamsType) => {
  let products: ProductType[] = [];
  let isLoading = false;
  let isError = false;
  let error = null;
  let refetch = () => { };
  let randomProducts: any[] = []; // Change to an array for multiple products

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
      const selectedIndices = new Set<number>();
      while (selectedIndices.size < 3 && selectedIndices.size < products.length) {
        const randomIndex = Math.floor(Math.random() * products.length);
        selectedIndices.add(randomIndex);
      }
      randomProducts = Array.from(selectedIndices).map(index => products[index]);
    }
  }

  return {
    randomProducts, // Return the array of random products
    products,
    isLoading,
    isError,
    error,
    refetch
  };
};