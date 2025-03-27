// External Libraries
import { Suspense } from "react";

// Presentation Layer
import CategoryWrapper from "@/components/products/category-wrapper";

// Constants
import { categoriesRef } from "@/constants/product-constants";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;
  
  const categoryData = categoriesRef[category];
  if (!categoryData) {
    return <p>Category not found</p>;
  }

  return (
    <Suspense fallback={<p>Loading category...</p>}>
      <section aria-labelledby="category-section">
        <h1 id="category-section" className="sr-only">
          {`Category: ${category}`}
        </h1>
        <CategoryWrapper category={categoryData} categorySlug={category} />
      </section>
    </Suspense>
  );
}