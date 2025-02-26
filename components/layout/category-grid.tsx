"use client";

import { useProducts } from "@/hooks/use-products";
import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import stringSimilarity from 'string-similarity';
import { Skeleton } from "@/components/ui/skeleton";
import { makeSlug } from "@/utils/string-utils";
import { ProductType } from "@/types/product-types";

const CategoryGrid = ({ category, categorySlug, sort, search }: Readonly<{ category: string, categorySlug: string, sort: string, search?: string }>) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { products, isLoading: loading, isError: error } = useProducts({ category: categorySlug, shouldFetch: shouldFetch});

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const href = entry.target.getAttribute('data-href');
          if (href) {
            router.prefetch(href);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '50px',
      threshold: 0
    });

    document.querySelectorAll('[data-href]').forEach(link => {
      observerRef.current?.observe(link);
    });

    return () => observerRef.current?.disconnect();
  }, [router]);

  const shuffleArray = (array: ProductType[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const sortProductsByPrice = (array: ProductType[], lowToHigh = true) => {
    return [...array].sort((a, b) => lowToHigh ? a['clothing-price'] - b['clothing-price'] : b['clothing-price'] - a['clothing-price']);
  };

  useEffect(() => {
    setShouldFetch(true);
  }, []);

  const searchProductsWithScoring = (products: ProductType[], search: string) => {
    if (!products || products.length === 0) {
      return { results: [], bestMatch: null };
    }
  
    const searchWords = search.toLowerCase().split(' ');
  
    const results = products
      .map(product => {
        const productWords = product['clothing-name'].toLowerCase().split(' ');
        let score = 0;
        let allWordsMatch = true;
  
        searchWords.forEach(searchWord => {
          let wordMatched = false;
  
          productWords.forEach(productWord => {
            if (productWord.startsWith(searchWord)) {
              score += 2; // starting match
              wordMatched = true;
            } else if (productWord.includes(searchWord)) {
              score += 1; // partial match
              wordMatched = true;
            } else {
              const similarity = stringSimilarity.compareTwoStrings(searchWord, productWord);
              if (similarity >= 0.7) {
                score += similarity; // similarity score
                wordMatched = true;
              }
            }
          });
  
          if (!wordMatched) allWordsMatch = false;
        });
  
        return { product, score, allWordsMatch };
      })
      .filter(item => item.allWordsMatch && item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  
    let bestMatch: ProductType | null = null;
  
    if (results.length > 0) {
      bestMatch = results[0];
    } else if (search.trim() && products.length > 0) {
      const productNames = products.map(p => p['clothing-name']);
      const bestMatchName = stringSimilarity.findBestMatch(search, productNames).bestMatch.target;
      bestMatch = products.find(p => p['clothing-name'] === bestMatchName) || null;
    }
  
    return { results, bestMatch };
  };

  const sortedProducts = useMemo<{ results: ProductType[]; bestMatch: ProductType | null }>(() => {
    if (!products) return { results: [], bestMatch: null };

    let searchResults: { results: ProductType[]; bestMatch: ProductType | null } = { results: [], bestMatch: null };

    if (search) {
      searchResults = searchProductsWithScoring(products, search);
    }

    switch (sort) {
      case 'latest':
        return { results: search ? searchResults.results : shuffleArray([...products]), bestMatch: search ? searchResults.bestMatch : null };
      case 'price-asc':
        return { results: search ? sortProductsByPrice(searchResults.results) : sortProductsByPrice([...products]), bestMatch: search ? searchResults.bestMatch : null };
      case 'price-desc':
        return { results: search ? sortProductsByPrice(searchResults.results, false) : sortProductsByPrice([...products], false), bestMatch: search ? searchResults.bestMatch : null };
      default:
        return { results: products, bestMatch: null };
    }
  }, [products, sort, search]);

  const isLoadingResults = !search && sortedProducts.results.length === 0;

  return (
    <>
      {categorySlug !== 'all-products' ? (
        <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
          {category}
          <div className="text-lg font-semibold text-muted-foreground">Category</div>
        </h1>
      ) : (
        <>
          {!search && (
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">All Products</h1>
          )}
          {search && (
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
              Searching for "{search}"
            </h1>
          )}
        </>
      )}

      {isLoadingResults ? (
        <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 9 }).map((_, index) => (
            <li key={index} className="group">
              <Skeleton className="aspect-square rounded-lg" />
            </li>
          ))}
        </ul>
      ) : sortedProducts.results.length > 0 ? (
        <ul className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {sortedProducts.results.map((product: ProductType, index: number) => (
            <li key={index} className="group">
              <Link href={`/${product['category_pk'].slice(9)}/${makeSlug(product['clothing-name'])}`} data-href={`${product['category_pk'].slice(9)}/${makeSlug(product['clothing-name'])}`}>
                <article className="overflow-hidden bg-white">
                  <div className="rounded-lg aspect-square w-full overflow-hidden bg-neutral-100">
                    <Image src={product['image-url']} alt="" width="768" height="768" className="group-hover:rotate hover-perspective w-full bg-neutral-100 object-cover object-center transition-opacity group-hover:opacity-75" />
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
          ))}
        </ul>
      ) : (
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">No Results Found for "{search}"</h1>
          <h2 className="max-w-md text-2xl text-center text-neutral-500">
            Did you mean:&nbsp;
            <Link className='underline' href={`/all-products?search=${encodeURIComponent(sortedProducts.bestMatch?.["clothing-name"] || '')}`}>
              {sortedProducts.bestMatch?.["clothing-name"]}
            </Link>?
          </h2>
        </div>
      )}
    </>
  );
};

export default CategoryGrid;
