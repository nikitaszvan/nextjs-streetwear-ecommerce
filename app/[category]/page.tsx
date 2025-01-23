
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import CategoryWrapper from "@/components/layout/category-wrapper";


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
    <CategoryWrapper children=
          {category !== 'all-products' &&
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
          }
      category={categoriesRef[category]} categorySlug={category}
    />
  );
}