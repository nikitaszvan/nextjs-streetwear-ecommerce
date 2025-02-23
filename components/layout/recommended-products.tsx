"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ProductType } from "@/types/product-types";
import { makeSlug } from "@/utils/string-utils";

const RecommendedProducts = ({randomProducts} : {randomProducts: Array<ProductType>}) => {
     const router = useRouter();
        const observerRef = useRef<IntersectionObserver | null>(null);
    
        useEffect(() => {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const href = entry.target.getAttribute('data-href');
                            if (href) {
                                router.prefetch(href);
                            }
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: '50px',
                    threshold: 0
                }
            );
    
            document.querySelectorAll('[data-href]').forEach(link => {
                observerRef.current?.observe(link);
            });
    
            return () => observerRef.current?.disconnect();
        }, [router, randomProducts]);

  return (
    <section className="py-12">
        <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {randomProducts?.filter((prod): prod is ProductType => prod !== null)
            .map((prod: ProductType, index: number) => 
                <Link key={index} href={`/${prod['category_pk'].slice(9)}/${makeSlug(prod["clothing-name"])}`}>
                    <div className="bg-card rounded overflow-hidden shadow group h-full flex flex-col">
                        <div className="block relative w-full aspect-square">
                            <Image alt="" src={prod['image-url']} fill className="bg-neutral-100 object-cover object-center group-hover:opacity-80 transition-opacity" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow justify-between">
                            <h3 className="text-lg font-semibold mb-2">
                                <span className="hover:text-primary">{prod['clothing-name']}</span>
                            </h3>
                            <div className="flex items-center justify-between">
                                <span>$ {prod['clothing-price']}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    </section>
  );
}

export default RecommendedProducts;