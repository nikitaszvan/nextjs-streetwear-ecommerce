// Presentation Layer
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// External Libraries
import React from "react";

// Constants
import { categoriesRef } from "@/constants/product-constants";

// Service Layer
import { makeTitleCase } from "@/lib/utils/string-utils";

type BreadcrumbLinksParams = {
    category: string;
    product?: string;
};

const BreadcrumbLinks = ({ category, product }: BreadcrumbLinksParams) => {
    return (
        category !== "All" &&
        <Breadcrumb className="!pl-1" aria-label="Breadcrumb">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/all-products">
                        <span>All products</span>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    {product ?
                        <BreadcrumbLink href={`/${category}`}>
                            <span>{categoriesRef[category] || category}</span>
                        </BreadcrumbLink>
                        :
                        <span>{categoriesRef[category] || category}</span>
                    }
                </BreadcrumbItem>

                {product && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            <BreadcrumbLink>
                                <span>{makeTitleCase(product)}</span>
                            </BreadcrumbLink>
                        </BreadcrumbPage>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadcrumbLinks;