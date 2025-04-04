"use client";

// Presentation Layer
import Link from "next/link";
import Image from "next/image";

// Service Layer
import { makeSlug } from "@/lib/utils/string-utils";

// External Libraries
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
import { ProductType } from "@/types/product-types";

const RecommendedProducts = ({ randomProducts }: { randomProducts: Array<ProductType> }) => {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const href = entry.target.getAttribute("data-href");
            if (href) {
              router.prefetch(href);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0,
      }
    );

    document.querySelectorAll("[data-href]").forEach((link) => {
      observerRef.current?.observe(link);
    });

    return () => observerRef.current?.disconnect();
  }, [router, randomProducts]);

  return (
    <section className="py-12" aria-labelledby="recommended-products-heading">
      <div className="mb-8">
        <h2 id="recommended-products-heading" className="text-2xl font-bold tracking-tight">
          You May Also Like
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {randomProducts
          ?.filter((prod): prod is ProductType => prod !== null)
          .map((prod: ProductType, index) => (
            <Link
              key={index}
              href={`/${prod["category_pk"].slice(9)}/${makeSlug(prod["clothing-name"])}`}
              data-href={`/${prod["category_pk"].slice(9)}/${makeSlug(prod["clothing-name"])}`}
              aria-label={`View details for ${prod["clothing-name"]}`}
            >
              <div className="bg-card rounded overflow-hidden shadow group h-full flex flex-col">
                <div className="block relative w-full aspect-square">
                  <Image
                    alt={`Image of ${prod["clothing-name"]}`}
                    src={prod["image-url"]}
                    fill
                    className="bg-neutral-100 object-cover object-center group-hover:opacity-80 transition-opacity"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <h3 className="text-lg font-semibold mb-2">
                    <span className="hover:text-primary">{prod["clothing-name"]}</span>
                  </h3>
                  <div className="flex items-center justify-between">
                    <span>$ {prod["clothing-price"]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;