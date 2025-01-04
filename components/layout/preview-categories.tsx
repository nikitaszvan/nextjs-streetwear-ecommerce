"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

const categoriesRef: Record<string, string> = {
  "shirts-top-men" : "Tops",
  "outerwear-top-men" : "Outerwear",
  "pants-bottom-men" : "Bottoms",
  "shoes-men" : "Shoes"
}

interface Product {
  'category_pk': string;
  'clothing-name': string;
  'clothing-price': number;
  'image-type': string;
  'image-url': string;
  'sort_key': string;
  'upload-date': string;
};


const PreviewCategories = ({category}: { category: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products?category=${category}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const products = await response.json();
        console.log(products);
        setProducts(products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((_, index) => (
          <div 
            key={index} 
            className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col my-5">
      <div className="justify-end gap-4 px-4 py-2 w-fit flex">
        <h3 className="text-xl font-bold tracking-tight">{categoriesRef[category]}</h3>
        <h3 className="text-md font-medium text-neutral-600 self-end hover:underline">view all</h3>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.slice(0, 4).map((product, index) => (
            <div key={index} className="relative aspect-[3/4]">
                <Image
                src={product['image-url']}
                alt={`Streetwear product ${index + 1}`}
                fill
                className="!relative object-cover rounded-lg transition-transform"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
                />
                <div className="p-2">
                    <h2 className="text-md font-medium text-neutral-700">{product['clothing-name']}</h2>
                    <footer className="text-sm font-normal text-neutral-900"><p>$ {product['clothing-price']}</p></footer>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PreviewCategories;