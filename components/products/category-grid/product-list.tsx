import { ProductType } from "@/types/product-types";
import ProductItem from "./product-item";

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <ul
      className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 w-full xl:pr-12"
      aria-label="Product list"
    >
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;