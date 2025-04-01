"use client";

// Presentation Layer
import RecommendedProducts from "./recommended-products";
import AddToCartButton from "@/components/products/product-page/add-to-cart-button";
import BreadcrumbLinks from "../category-grid/breadcrumb-links";
import ProductDetails from "./product-details";
import ColorPicker from "./color-picker";
import ProductImage from "./product-image";
import SizePicker from "./size-picker";

// Data Access Layer
import { useProducts } from "@/lib/hooks/use-products";

// Service Layer
import { makeTitleCase } from "@/lib/utils/string-utils";

// External Libraries
import { useState } from "react";

// Types
import { ProductType } from "@/types/product-types";
import { ColorType } from "@/types/cart-types";


const ProductPageComponent = ({
  product,
  category,
  recos,
}: Readonly<{
  product: string;
  category: string;
  recos: ProductType[];
}>) => {
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { products } = useProducts({ category: category, shouldFetch: true });

  const prod: ProductType | undefined = products?.find(
    (p: ProductType) => p["clothing-name"] === makeTitleCase(product)
  );

  if (!prod) return <div>Product not found</div>;

  return (
    <div className="flex flex-col gap-6 justify-center mx-auto w-full max-w-7xl flex-1 pt-2 sm:px-6 lg:px-8">
      <BreadcrumbLinks category={category} product={product} />
      <div className="flex gap-4">
        <ProductImage imageUrl={prod["image-url"]} altText={`Product Image for ${product}`}/>
        <div className="flex flex-col flex-1 gap-4">
          <ProductDetails productName={makeTitleCase(product)} productPrice={prod["clothing-price"]} />
          <ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          <SizePicker selectedSize={selectedSize} onSelectSize={setSelectedSize} />
          <AddToCartButton
            product={{ ...prod, size: selectedSize, color: selectedColor }}
            active={Boolean(selectedColor && selectedSize)}
          />
        </div>
      </div>
      <RecommendedProducts randomProducts={recos} />
    </div>
  );
};

export default ProductPageComponent;