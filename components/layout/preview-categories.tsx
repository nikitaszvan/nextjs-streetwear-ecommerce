"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';


type PreviewCategoriesProps = {
  category: string;
  searchString: string;
}

const PreviewCategories = ({ category, searchString }: PreviewCategoriesProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/fetch-preview-images?${searchString}`);

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        console.log(data.images);
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [searchString]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((_, index) => (
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
    <div className="flex flex-col">
      <div className="justify-end gap-2 px-4 py-2 text-neutral-600"><h3 className="text-lg font-bold tracking-tight">{category}</h3></div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {images.slice(0, 4).map((imageUrl, index) => (
            <div key={index} className="relative aspect-[3/4]">
                <Image
                src={imageUrl}
                alt={`Streetwear product ${index + 1}`}
                fill
                className="!relative object-cover rounded-lg hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
                />
                <div className="p-2">
                    <h2 className="text-md font-medium text-neutral-700">Horizon Gaze Sunglasses</h2>
                    <footer className="text-sm font-normal text-neutral-900"><p>$20.00</p></footer>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PreviewCategories;