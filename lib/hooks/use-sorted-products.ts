// hooks/useSortedProducts.ts

import { useMemo } from "react";
import { ProductType } from "@/types/product-types";
import { shuffleArray, sortProductsByPrice, searchProductsWithScoring } from "@/lib/utils/products-utils";

type useSortedProductsParams = {
    products: ProductType[];
    sort: string;
    search?: string;
};

export const useSortedProducts = ({
    products,
    sort,
    search
}: useSortedProductsParams) => {
    return useMemo(() => {
        if (!products) return { results: [], bestMatch: null };

        let searchResults: { results: ProductType[]; bestMatch: ProductType | null } = { results: [], bestMatch: null };

        if (search) {
            searchResults = searchProductsWithScoring({ products, search });
        }

        switch (sort) {
            case 'latest':
                return { results: search ? searchResults.results : shuffleArray({ array: [...products]}), bestMatch: search ? searchResults.bestMatch : null };
            case 'price-asc':
                return { results: search ? sortProductsByPrice({ array: searchResults.results }) : sortProductsByPrice({ array: [...products] }), bestMatch: search ? searchResults.bestMatch : null };
            case 'price-desc':
                return { results: search ? sortProductsByPrice({ array: searchResults.results, lowToHigh: false }) : sortProductsByPrice({ array: [...products], lowToHigh: false }), bestMatch: search ? searchResults.bestMatch : null };
            default:
                return { results: products, bestMatch: null };
        }
    }, [products, sort, search]);
};