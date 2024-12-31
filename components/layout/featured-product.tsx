"use client"

import Image from "next/image";

const FeaturedProduct = () => {
  return (
    <section className="rounded py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
            <div className="max-w-md space-y-4">
                <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Discover our Curated Collection</h2>
                <p className="text-pretty text-neutral-600">Explore our carefully selected products for your home and lifestyle.</p>
                <a className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-6 font-medium text-neutral-50 transition-colors hover:bg-neutral-900/90 focus:outline-none focus:ring-1 focus:ring-neutral-950" href="/category/accessories">Shop Now</a>
            </div>
            <Image alt="Featured Itme"
            className="object-cover rounded-lg hover:scale-105 transition-transform"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" width="350" height="350" src="https://assets.lummi.ai/assets/QmfJXFaQ7XmMSijP34yiWcVTUFvL7rV8pYVERuavuF3rB2?auto=format&w=1500"/>
        </div>
    </section>
  )
}

export default FeaturedProduct;