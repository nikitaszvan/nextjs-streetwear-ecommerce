"use client";

// Presentation Layer
import CategoryGrid from "@/components/products/category-grid/category-grid";
import ProductsFilter from "@/components/products/category-grid/products-filter";

// External Libraries
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import BreadcrumbLinks from "./breadcrumb-links";

export default function CategoryWrapper({
  category,
  categorySlug,
}: {
  category: string;
  categorySlug: string;
}) {
  const [selectedSort, setSelectedSort] = useState<string>("latest");

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  return (
    <div className="flex p-2 gap-6 w-full" role="main">
      <ProductsFilter
        onFilterChange={setSelectedSort}
        selectedSort={selectedSort}
        aria-label="Product filter"
      />
      <div
        className="mx-auto flex flex-col w-full max-w-7xl flex-1 px-4 pb-6 pt-2 sm:px-6 lg:px-8 gap-5"
        aria-live="polite"
      >
        <BreadcrumbLinks category={category} />
        <CategoryGrid
          category={category}
          categorySlug={categorySlug}
          sort={selectedSort}
          onFilterChange={setSelectedSort}
          search={search || undefined}
        />
      </div>
    </div>
  );
}