import CategoryGrid from "@/components/layout/category-grid";
import ProductsFilter from '@/components/layout/products-filter';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";


const categoriesRef: Record<string, string> = {
  "shirts-top-men": "Tops",
  "outerwear-top-men": "Outerwear",
  "pants-bottom-men": "Bottoms",
  "shoes-men": "Shoes"
} as const;


export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {

  const { category } = await params;

  return (
    <>
      <ProductsFilter />
      <div className='mx-auto flex flex-col w-full max-w-7xl flex-1 px-4 pb-6 pt-2 sm:px-6 lg:px-8 gap-5'>
            <Breadcrumb className="!pl-1">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/all-products">All products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>
                        <BreadcrumbLink>{categoriesRef[category]}</BreadcrumbLink>
                    </BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
        <CategoryGrid category={categoriesRef[category]} categorySlug={category} />
      </div>
    </>
  );
}