
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import CategoryWrapper from "@/components/layout/category-wrapper";
import Link from "next/link";
import { categoriesRef } from "@/constants/product-constants";

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
                        <Link href='/all-products' passHref>
                          <span>All products</span>
                        </Link>
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