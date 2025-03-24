"use client"

import { useState } from "react";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import Image from "next/image";

import { useProducts } from "@/hooks/use-products";

import RecommendedProducts from "./recommended-products";
import AddToCartButton from "../cart/add-to-cart-button";
import { ProductType } from "@/types/product-types";
import { ColorType } from "@/types/cart-types";
import { categoriesRef } from "@/constants/product-constants";


const makeTitleCase = (str: string) => {
    return str.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}

const ProductPageComponent = ({
    product,
    category,
    recos
}: Readonly<{
    product: string;
    category: string;
    recos: ProductType[];
}>) => {


    const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const handleColorSelect = (color: ColorType) => {
        setSelectedColor(color);
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size);
    };

    const { products } = useProducts({category: category, shouldFetch: true});

    const prod: ProductType | undefined = products?.find(
        (p: ProductType) => (p['clothing-name']) === makeTitleCase(product)
    );


    const colorChoices = [
        {
            name: "Crimson Whisper",
            rgba: "rgba(153, 76, 76, 0.7)"
        },
        {
            name: "Forest Haze",
            rgba: "rgba(76, 102, 76, 0.7)"
        },
        {
            name: "Twilight Indigo",
            rgba: "rgba(76, 76, 153, 0.7)"
        },
        {
            name: "Golden Dusk",
            rgba: "rgba(153, 153, 76, 0.7)"
        },
        {
            name: "Aqua Mist",
            rgba: "rgba(76, 153, 153, 0.7)"
        }
    ];

    const sizeChoices = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

    if (!prod) return <div>Product not found</div>;


    return (
        <div className="flex flex-col gap-6 justify-center mx-auto w-full max-w-7xl flex-1 pt-2 sm:px-6 lg:px-8">
            <Breadcrumb className="!pl-1">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link href="/all-products" passHref>
                            <span>All products</span>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link href={`/${category}`} passHref>
                            <span>{categoriesRef[category]}</span>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>
                        <BreadcrumbLink>{makeTitleCase(product)}</BreadcrumbLink>
                    </BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex gap-4">
                <div className="flex w-[80vh] aspect-square justify-center relative">
                    <Image className="rounded-md group-hover:rotate hover-perspective bg-neutral-100 object-cover object-bottom transition-opacity group-hover:opacity-75" src={prod["image-url"]} alt="" fill />
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
                                <p>These classics are a wardrobe essential. Designed for both comfort and versatility, they pair well with any attire. The cushioned inner layer ensures all-day comfort.</p>
                            </div>
                        </section>
                        <section>
                            <h2 className="sr-only">Colour</h2>
                            <h2 className="font-bold text-lg my-2">Colour:</h2>
                            <div className="flex space-x-2">
                                {colorChoices.map((color, index) => {
    
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleColorSelect(color)}
                                            data-test-id="vf-color-picker"
                                            type="button"
                                            aria-current="true"
                                            className="group flex items-center justify-center outline-none h-11 p-1 w-11"
                                        >
                                            <span className={`relative w-full h-full duration-200 group-focus-visible:outline ${(selectedColor?.name && (selectedColor.name == color.name)) && 'ring ring-black ring-2 ring-inset'} rounded-full`}>
                                                <span
                                                    className="absolute inset-0.5 lg:inset-1 bg-gray-200 rounded-full"
                                                    style={{ background: color.rgba }}
                                                ></span>
                                                <span className="sr-only">{color.name}</span>
                                            </span>
                                        </button>
                                    )
                                })}

                            </div>
                        </section>
                        <section>
                            <h2 className="sr-only">Sizes</h2>
                            <h2 className="font-bold text-lg my-2">Sizes:</h2>
                            <div className="flex space-x-2">
                                {sizeChoices.map((size, index)=> {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleSizeSelect(size)}
                                            data-test-id="vf-size-picker"
                                            type="button"
                                            aria-current="true"
                                            className={`group flex items-center justify-center outline-none h-8 px-3 w-11 rounded ${selectedSize === size ? 'text-white bg-black' : 'hover:bg-gray-200 text-black bg-white'}`}
                                        >
                                            <span className={`relative w-full h-full duration-200 group-focus-visible:outline flex justify-center items-center`}>
                                                {size}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                        <AddToCartButton product={{...prod, size: selectedSize, color: selectedColor}} active={Boolean(selectedColor && selectedSize)} />
                    </div>
                </div>
            </div>
            <RecommendedProducts randomProducts={recos} />
        </div>
    );
}

export default ProductPageComponent;