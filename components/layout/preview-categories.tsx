"use client"

import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { 
  fetchProductsByCategory,
  makeSelectCategoryProducts
} from '@/lib/features/productsSlice';
import Image from 'next/image';

const categoriesRef: Record<string, string> = {
  "shirts-top-men" : "Tops",
  "outerwear-top-men" : "Outerwear",
  "pants-bottom-men" : "Bottoms",
  "shoes-men" : "Shoes"
}

const PreviewCategories = ({category}: { category: string }) => {

  const dispatch = useAppDispatch();
  
  const { loading, error, products } = useAppSelector(
    useMemo(
      () => makeSelectCategoryProducts(categoriesRef[category]),
      [category]
    )
  );

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [category, dispatch]);


  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
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