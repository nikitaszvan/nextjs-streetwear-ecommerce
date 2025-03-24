"use client"

import PreviewCategories from "@/components/products/preview-categories";
import { useState, useEffect } from "react";
import { categories } from '@/constants/product-constants';

const PreviewProductsContainer = () => {
    const [shouldFetch, setShouldFetch] = useState(false);
  
    useEffect(() => {
      setShouldFetch(true);
    }, []);
  
    return (
      <>
        {categories.map(category => (
          <PreviewCategories 
            key={category} 
            category={category} 
            shouldFetch={shouldFetch}
          />
        ))}
      </>
    );
  };
  
  export default PreviewProductsContainer;
  