import { notFound } from 'next/navigation';
import { categoriesRef } from '@/constants/product-constants';
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
import { Suspense } from 'react';

const CategoryLayout = async ({
    params
}: Readonly<{
    params: { category: string }
}>) => {
    const { category } = await params;

    if (!Object.keys(categoriesRef).includes(category)) {
        return (
            notFound()
        );
    }

    return (
        <Suspense>
            <CategoryWrapper category={categoriesRef[category]} categorySlug={category}>
                {category !== 'all-products' && (
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
                )}
            </CategoryWrapper>
        </Suspense>
    )
};

export default CategoryLayout;