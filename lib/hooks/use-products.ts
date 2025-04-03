// Data Access Layer
import { useGetProductsByCategoryQuery } from '@/lib/api/products-api';

// Constants

// Types
import { ProductType } from '@/types/product-types';

type UseProductsParamsType = {
  category: string;
  shouldFetch: boolean;
  product?: string;
  random?: boolean;
}

export const useProducts = ({ category, shouldFetch, product, random }: UseProductsParamsType) => {
  const products: ProductType[] = [];

  const queries = {
    category1: useGetProductsByCategoryQuery("shirts-top-men", { skip: !shouldFetch || (category !== "all-products" && category !== "shirts-top-men"), refetchOnReconnect: true }),
    category2: useGetProductsByCategoryQuery("outerwear-top-men", { skip: !shouldFetch || (category !== "all-products" && category !== "outerwear-top-men"), refetchOnReconnect: true }),
    category3: useGetProductsByCategoryQuery("pants-bottom-men", { skip: !shouldFetch || (category !== "all-products" && category !== "pants-bottom-men"), refetchOnReconnect: true }),
    category4: useGetProductsByCategoryQuery("shoes-men", { skip: !shouldFetch || (category !== "all-products" && category !== "shoes-men"), refetchOnReconnect: true }),
  };

  const queriesArray = Object.values(queries);

  const isLoading = queriesArray.some(query => query.isLoading);
  const isError = queriesArray.some(query => query.isError);
  const error = queriesArray.find(query => query.error)?.error || null;

  queriesArray.forEach(query => {
    if (query.data) {
      products.push(...query.data);
    }
  });

  const refetch = () => {
    queriesArray.forEach(query => query.refetch());
  };

  let randomProducts: ProductType[] = [];

  if (random && products.length > 0) {
    const filteredProducts = product ? products.filter(p => p['clothing-name'] !== product) : products;
    const selectedIndices = new Set<number>();
    
    while (selectedIndices.size < 3 && selectedIndices.size < filteredProducts.length) {
      const randomIndex = Math.floor(Math.random() * filteredProducts.length);
      selectedIndices.add(randomIndex);
    }

    randomProducts = Array.from(selectedIndices).map(index => filteredProducts[index]);
  }

  return {
    randomProducts,
    products,
    isLoading,
    isError,
    error,
    refetch
  };
};