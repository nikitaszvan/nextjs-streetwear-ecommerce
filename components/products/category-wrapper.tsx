"use client"

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useState } from "react";
import CategoryGrid from "@/components/layout/category-grid";
import ProductsFilter from '@/components/layout/products-filter';
import { useSearchParams } from 'next/navigation';


export default function CategoryWrapper({
  category,
  categorySlug
}: {
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
    <div className="flex p-2 w-full">
      <ProductsFilter onFilterChange={handleFilterChange} selectedSort={selectedSort} />
      <div className='mx-auto flex flex-col w-full max-w-7xl flex-1 px-4 pb-6 pt-2 sm:px-6 lg:px-8 gap-5'>
      {category !== 'All' &&
            <Breadcrumb className="!pl-1">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href='/all-products' passHref>
                          <span>All products</span>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>
                        <BreadcrumbLink>{category}</BreadcrumbLink>
                    </BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
          }
        <CategoryGrid category={category} categorySlug={categorySlug} sort={selectedSort} search={search || undefined} />
      </div>
    </div>
  );
}