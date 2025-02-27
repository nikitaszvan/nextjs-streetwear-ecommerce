

import CategoryWrapper from "@/components/layout/category-wrapper";
import { categoriesRef } from "@/constants/product-constants";
import { Suspense } from "react";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {



  const { category } = await params;

  return (
    <Suspense>
      <CategoryWrapper category={categoriesRef[category]} categorySlug={category} />
    </Suspense>
  );
}