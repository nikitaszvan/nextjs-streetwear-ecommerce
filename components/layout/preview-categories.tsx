"use client";

// Presentation Layer
import Image from "next/image";
import Link from "next/link";

// Service Layer
import { makeSlug } from "@/lib/utils/string-utils";

// Data Access Layer
import { useProducts } from "@/lib/hooks/use-products";

// Types
import { ProductType } from "@/types/product-types";

// Constants
import { categoriesRef } from "@/constants/product-constants";

interface PreviewCategoriesProps {
  category: string;
  shouldFetch: boolean;
}

const PreviewCategories = ({ category, shouldFetch }: PreviewCategoriesProps) => {
  const { products, isLoading: loading, isError: error } = useProducts({
    category: category,
    shouldFetch: shouldFetch,
  });

  if (loading) {
    return (
      <section className="my-[3rem]" aria-busy="true" aria-label="Loading products">
        <div className="justify-end gap-4 px-4 py-2 w-fit flex">
          <h3 className="text-xl font-bold tracking-tight">{categoriesRef[category]}</h3>
          <Link href={`/${makeSlug(category)}`} className="text-md font-medium text-neutral-600 self-end hover:underline">
            view all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse" aria-hidden="true" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <section className="flex flex-col my-5" aria-label={`Preview of ${categoriesRef[category]}`}>
      <div className="justify-end gap-4 px-4 py-2 w-fit flex">
        <h3 className="text-xl font-bold tracking-tight">{categoriesRef[category]}</h3>
        <Link href={`/${makeSlug(category)}`} className="text-md font-medium text-neutral-600 self-end hover:underline">
          view all
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.slice(0, 4).map((product: ProductType, index) => (
          <div key={index} className="relative aspect-[3/4]">
            <Link href={`${category}/${makeSlug(product["clothing-name"])}`}>
              <Image
                src={product["image-url"]}
                alt={`Image of ${product["clothing-name"]}`}
                fill
                className="!relative object-cover rounded-lg transition-transform"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority
              />
            </Link>
            <div className="p-2">
              <h2 className="text-md font-medium text-neutral-700">{product["clothing-name"]}</h2>
              <footer className="text-sm font-normal text-neutral-900">
                <p>$ {product["clothing-price"]}</p>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewCategories;