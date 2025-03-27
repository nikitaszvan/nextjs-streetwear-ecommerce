// External Libraries
import { notFound } from 'next/navigation';

// Constants
import { categoriesRef } from '@/constants/product-constants';

const CategoryLayout = async ({
  children,
  params
}: Readonly<{
  children?: React.ReactNode;
  params: Promise<{ category: string }>
}>) => {
  const { category } = await params;

  if (!Object.keys(categoriesRef).includes(category)) {
    notFound();
  }

  return (
    <section
      aria-labelledby="category-section"
      className="flex p-2"
    >
      <h1 id="category-section" className="sr-only">
        {`Category: ${category}`}
      </h1>
      {children}
    </section>
  );
};

export default CategoryLayout;