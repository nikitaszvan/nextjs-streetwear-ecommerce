// Presentation Layer
import ProductItem from "./product-item";

// Types
import { ProductType } from "@/types/product-types";

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <ul
      className="mt-6 grid grid-cols-2 gap-6 md:gap-8 xl:grid-cols-3 w-full xl:pr-12"
      aria-label="Product list"
    >
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;