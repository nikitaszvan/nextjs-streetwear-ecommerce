import Image from "next/image";
import Link from "next/link";
import { makeSlug } from "@/lib/utils/string-utils";
import { ProductType } from "@/types/product-types";

const ProductItem = ({ product }: { product: ProductType }) => {
  return (
    <li>
      <Link href={`/${product['category_pk'].slice(9)}/${makeSlug(product['clothing-name'])}`} data-href={`${product['category_pk'].slice(9)}/${makeSlug(product['clothing-name'])}`}>
        <article className="overflow-hidden bg-white">
          <div className="relative rounded-lg aspect-square w-full overflow-hidden bg-neutral-100">
            <Image src={product['image-url']} alt="" className="hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity" fill/>
          </div>
          <div className="p-2">
            <h2 className="text-xl font-medium text-neutral-700">{product['clothing-name']}</h2>
            <footer className="text-base font-normal text-neutral-900">
              <p>${product['clothing-price']}</p>
            </footer>
          </div>
        </article>
      </Link>
    </li>
  );
};

export default ProductItem;