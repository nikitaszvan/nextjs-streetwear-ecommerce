"use client";

import ProductPageComponent from "../products/product-page";
import { useProducts } from "@/hooks/use-products";

type ProdRecsWrapperProps = {
  category: string;
  product: string;
};

const ProdRecsWrapper = ({ category, product }: ProdRecsWrapperProps) => {

  const { randomProducts } = useProducts({
    category: category,
    shouldFetch: true,
    random: true,
  });

  return (
    <ProductPageComponent
      category={category}
      product={product}
      recos={randomProducts}
    />
  );
};

export default ProdRecsWrapper;