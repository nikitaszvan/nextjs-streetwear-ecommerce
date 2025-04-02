"use client";

// Presentation Layer
import ProductPageComponent from "./product-page";

// Data Access Layer
import { useProducts } from "@/lib/hooks/use-products";

type ProdRecsWrapperParams = {
  category: string;
  product: string;
};

const ProdRecsWrapper = ({ category, product }: ProdRecsWrapperParams) => {
  const { randomProducts } = useProducts({
    category: category,
    product: product,
    shouldFetch: true,
    random: true,
  });

  const recommendations = Array.isArray(randomProducts) ? randomProducts : [];

  return (
    <ProductPageComponent
      category={category}
      product={product}
      recos={recommendations}
    />
  );
};

export default ProdRecsWrapper;