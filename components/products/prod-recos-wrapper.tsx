"use client";

// Presentation Layer
import ProductPageComponent from "../products/product-page";

// Data Access Layer
import { useProducts } from "@/lib/hooks/use-products";

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