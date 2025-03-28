"use client"
// External Libraries
import Image from "next/image";
import Link from "next/link";

// Presentation Layer
import { Button } from "../ui/button";

const FeaturedProduct = () => {
  return (
    <section className="rounded py-8 sm:py-12">
      <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
        <div className="max-w-md space-y-4">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Discover our Curated Collection</h2>
          <p className="text-pretty text-neutral-600">Explore our carefully selected products for your closet and lifestyle.</p>
          <Button className="rounded-full px-10 py-5 text-base">
            <Link className="" href="/all-products" passHref>Shop Now</Link>
          </Button>
        </div>
        <Image
          alt="Featured Item"
          className="object-cover rounded-lg"
          src="https://assets.lummi.ai/assets/QmcB7S1vRJVrxMRkNqohZWxEE6txDyM62aaQvqZXnQwceY?auto=format&w=1500"
          width={500}
          height={400}
        />
      </div>
    </section>
  )
}

export default FeaturedProduct;