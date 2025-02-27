"use client"

import { useState } from "react";
import CategoryGrid from "@/components/layout/category-grid";
import ProductsFilter from '@/components/layout/products-filter';
import { useSearchParams } from 'next/navigation';


export default function CategoryWrapper({
  children,
  category,
  categorySlug
}: {
  children: React.ReactNode;
  category: string;
  categorySlug: string;
}) {

  const [selectedSort, setSelectedSort] = useState<string>('latest')

  const handleFilterChange = (value: string) => {
    setSelectedSort(value);
  };

  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  return (
    <>
      <ProductsFilter onFilterChange={handleFilterChange} selectedSort={selectedSort} />
      <div className='mx-auto flex flex-col w-full max-w-7xl flex-1 px-4 pb-6 pt-2 sm:px-6 lg:px-8 gap-5'>
        {children}
        <CategoryGrid category={category} categorySlug={categorySlug} sort={selectedSort} search={search || undefined} />
      </div>
    </>
  );
}