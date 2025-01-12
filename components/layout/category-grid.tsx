"use client"

import { useProducts } from "@/hooks/use-products";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
    'category_pk': string;
    'clothing-name': string;
    'clothing-price': number;
    'image-type': string;
    'image-url': string;
    'sort_key': string;
    'upload-date': string;
  };

export default function CategoryGrid({
    category,
    categorySlug,
  }: Readonly<{
    category: string;
    categorySlug: string;
  }>) {

    const [shouldFetch, setShouldFetch] = useState(false);
    const [catProduct, setCatProducts] = useState([]);
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
    }, [router]);

    const makeSlug = (str: string) => {
        return str.split(" ").map((str) => str.toLowerCase()).join('-');
    }

    useEffect(() => {
      setShouldFetch(true);
    }, []);

    const {
    products,
    isLoading: loading,
    isError: error,
    } = useProducts(categorySlug, shouldFetch);

    return (
        <>
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
                {category}
                <div className="text-lg font-semibold text-muted-foreground">Category</div>
            </h1>
            <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {products?.map((product: Product, index: number) => 
                    <li key={index} className="group">
                        <Link href={`${categorySlug}/${makeSlug(product['clothing-name'])}`} data-href={`${categorySlug}/${makeSlug(product['clothing-name'])}`}>
                            <article className="overflow-hidden bg-white">
                                <div className="rounded-lg aspect-square w-full overflow-hidden bg-neutral-100">
                                    <Image src={product['image-url']} alt="" loading="eager" width="768" height="768" decoding="async" data-nimg="1" className="group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75" sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"/>
                                </div>
                                <div className="p-2">
                                    <h2 className="text-xl font-medium text-neutral-700">{product['clothing-name']}</h2>
                                    <footer className="text-base font-normal text-neutral-900">
                                        <p>$ {product['clothing-price']}</p>
                                    </footer>
                                </div>
                            </article>
                        </Link>
                    </li>   
                )}
            </ul>
        </>
    );
};