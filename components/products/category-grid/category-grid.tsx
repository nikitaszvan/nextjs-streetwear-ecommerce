// External Libraries
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

// Service Layer
import { useProducts } from "@/lib/hooks/use-products";
import { useSortedProducts } from "@/lib/hooks/use-sorted-products";

// Presentation Layer
import ProductListLoadingSkeleton from "./product-list-loading-skeleton";
import NoSearchResults from "./no-search-results";
import ProductList from "./product-list";

const CategoryGrid = ({ category, categorySlug, sort, search }: Readonly<{ category: string, categorySlug: string, sort: string, search?: string }>) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { products } = useProducts({ category: categorySlug, shouldFetch: shouldFetch });

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
    <>
      {categorySlug !== 'all-products' ?
        <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
          {category}
          <div className="text-lg font-semibold text-muted-foreground">Category</div>
        </h1>
        :
        <>
          {!search ? (
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">All Products</h1>
          ) : (
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
              Searching for &quot;{search}&quot;
            </h1>
          )}
        </>
      }

      {!!!(!search && results.length) ?
        <ProductListLoadingSkeleton />
        : results.length > 0 ?
          <ProductList products={results} />
          :
          <NoSearchResults search={search} bestMatch={bestMatch} />
      }
    </>
  );
};

export default CategoryGrid;