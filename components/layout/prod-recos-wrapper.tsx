"use client"

import ProductPageComponent from "./product-page";
import { useProducts } from "@/hooks/use-products";
import { categoriesRef } from "@/constants/product-constants";

type ProdRecsWrapperProps = {
  category: string;
  product: string;
};

const ProdRecsWrapper = ({ category, product }: ProdRecsWrapperProps) => {

    const getRemainingCategories = (currentCategory: string) => {
        return Object.keys(categoriesRef)
            .filter(key => key !== currentCategory)
            .map(key => key);
    };
    
    const recommendedprods = getRemainingCategories(category).map((cat) => {
        const { randomProduct } = useProducts(cat, true, true);
        return randomProduct;
    });

  return <ProductPageComponent category={category} product={product} recos={recommendedprods}/>;
};

export default ProdRecsWrapper;