"use client"

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";

import Image from "next/image";

import { useProducts } from "@/hooks/use-products";

import RecommendedProducts from "./recommended-products";
import AddToCartButton from "./add-to-cart-button";
import { ProductType } from "@/types/product-types";

const categoriesRef: Record<string, string> = {
    "shirts-top-men": "Tops",
    "outerwear-top-men": "Outerwear",
    "pants-bottom-men": "Bottoms",
    "shoes-men": "Shoes"
  } as const;


  const makeTitleCase = (str: string) => {
    return str.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }

  const getRemainingCategories = (currentCategory: string) => {
    return Object.keys(categoriesRef)
      .filter(key => key !== currentCategory)
      .map(key => key);
  };

  
const ProductPageComponent = ({
    product,
    category
}:  Readonly<{
    product: string;
    category: string;
    }>) => {

    const { products } = useProducts(category, true);
    
    const prod = products?.find(
        (p: ProductType) => (p['clothing-name']) === makeTitleCase(product)
    );

    const recommendedprods = getRemainingCategories(category).map((cat)=> {
        const { randomProduct } = useProducts(cat, true, true);
        return randomProduct;
    });


    if (!prod) return <div>Product not found</div>;


    return (
        <div className="flex flex-col gap-6 justify-center mx-auto w-full max-w-7xl flex-1 pt-2 sm:px-6 lg:px-8">
            <Breadcrumb className="!pl-1">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/all-products">All products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${category}`}>{categoriesRef[category]}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>
                        <BreadcrumbLink>{makeTitleCase(product)}</BreadcrumbLink>
                    </BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-4">
                <div className="flex w-[80vh] aspect-square justify-center relative">
                    <Image className="rounded-md group-hover:rotate hover-perspective bg-neutral-100 object-cover object-bottom transition-opacity group-hover:opacity-75" src={prod["image-url"]} alt="" fill/>
                </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">{makeTitleCase(product)}</h1>
                        <p className="mt-2 text-2xl font-medium leading-none tracking-tight text-foreground/70">$ {prod["clothing-price"]}</p>
                        <div className="mt-2"></div>
                    <div className="">
                        <h2 className="sr-only">Images</h2>
                        <div className="grid gap-4 lg:grid-cols-3 [&amp;>*:first-child]:col-span-3"></div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <section>
                            <h2 className="sr-only">Description</h2>
                            <div className="prose text-secondary-foreground">
                                <p>These classic black shoes are a wardrobe essential. Designed for both comfort and versatility, they pair well with any attire. The cushioned sole ensures all-day comfort.</p>
                            </div>
                        </section>
                        <AddToCartButton product={prod}/>
                    </div>
                </div>
            </div>
            <RecommendedProducts randomProducts={recommendedprods}/>
        </div>
    );
}

export default ProductPageComponent;