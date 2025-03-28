import { ProductType } from "@/types/product-types";
import ProductItem from "./product-item";

const ProductList = ({ products }: { products: ProductType[] }) => {
  return (
    <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full'>
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </ul>
  );
};

export default ProductList;