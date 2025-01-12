"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import Image from "next/image";

interface Product {
    'category_pk': string;
    'clothing-name': string;
    'clothing-price': number;
    'image-type': string;
    'image-url': string;
    'sort_key': string;
    'upload-date': string;
  };

  const makeSlug = (str: string) => {
    return str.split(" ").map((str) => str.toLowerCase()).join('-');
}

const RecommendedProducts = ({randomProducts} : {randomProducts: Array<Product>}) => {
     const router = useRouter();
        const observerRef = useRef<IntersectionObserver | null>(null);
    
        useEffect(() => {
            // Create intersection observer
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Get the href from the data attribute
                            const href = entry.target.getAttribute('data-href');
                            if (href) {
                                // Prefetch the route
                                router.prefetch(href);
                            }
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: '50px', // Start prefetching slightly before entering viewport
                    threshold: 0
                }
            );
    
            // Observe all links
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
            {randomProducts?.filter((prod): prod is Product => prod !== null)
            .map((prod: Product, index: number) => 
                <Link key={index} href={`/${prod['category_pk'].slice(9)}/${makeSlug(prod["clothing-name"])}`}>
                    <div className="bg-card rounded overflow-hidden shadow group">
                        <div className="block relative w-full aspect-square">
                            <Image alt="" src={prod['image-url']} fill className="bg-neutral-100 object-cover object-center group-hover:opacity-80 transition-opacity" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px" />
                        </div>
                        <div className="p-4">
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