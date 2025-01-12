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

const categoriesRef: Record<string, string> = {
    "shirts-top-men": "Tops",
    "outerwear-top-men": "Outerwear",
    "pants-bottom-men": "Bottoms",
    "shoes-men": "Shoes"
  } as const;

  interface Product {
    'category_pk': string;
    'clothing-name': string;
    'clothing-price': number;
    'image-type': string;
    'image-url': string;
    'sort_key': string;
    'upload-date': string;
  };

  const makeTitleCase = (str: string) => {
    return str.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }

  const getRemainingCategories = (currentCategory: string) => {
    return Object.keys(categoriesRef)
      .filter(key => key !== currentCategory)
      .map(key => key);
  };

export default function ProductPageComponent({
    product,
    category
}:  Readonly<{
    product: string;
    category: string;
    }>) {

    const { products } = useProducts(category, true);
    
    const prod = products?.find(
        (p: Product) => (p['clothing-name']) === makeTitleCase(product)
    );

    const recommendedprods = getRemainingCategories(category).map((cat)=> {
        const { randomProduct } = useProducts(cat, true, true);
        return randomProduct;
    });

    console.log(makeTitleCase(product));

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
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 rounded-full text-lg relative" id="button-add-to-cart" type="submit" aria-disabled="false">
                            <span className="transition-opacity ease-in opacity-100">Add to cart</span>
                            <span className="ease-out transition-opacity pointer-events-none absolute z-10 opacity-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle h-4 w-4 animate-spin">
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <RecommendedProducts randomProducts={recommendedprods}/>
        </div>
    );
}