// External Libraries
import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/navigation";

// Service Layer
import { useProducts } from "@/lib/hooks/use-products";
import { useSortedProducts } from "@/lib/hooks/use-sorted-products";

// Presentation Layer
import ProductListLoadingSkeleton from "./product-list-loading-skeleton";
import NoSearchResults from "./no-search-results";
import ProductList from "./product-list";
import Header from "./header";

type CategoryGridParams = {
  category: string;
  categorySlug: string;
  sort: string;
  search?: string;
  onFilterChange: Dispatch<SetStateAction<string>>
};

const CategoryGrid = ({
  category,
  categorySlug,
  sort,
  search,
  onFilterChange
}: CategoryGridParams) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { products } = useProducts({ category: categorySlug, shouldFetch });

  const { results, bestMatch } = useSortedProducts({ products, sort, search });

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

  useEffect(() => {
    setShouldFetch(true);
  }, []);

  return (
    <main>
      <Header categorySlug={categorySlug} category={category} search={search} onFilterChange={onFilterChange}/>
      {results.length === 0 && !search ? (
        <ProductListLoadingSkeleton />
      ) : results.length > 0 ? (
        <ProductList products={results} />
      ) : (
        <NoSearchResults search={search} bestMatch={bestMatch} />
      )}
    </main>
  );
};

export default CategoryGrid;