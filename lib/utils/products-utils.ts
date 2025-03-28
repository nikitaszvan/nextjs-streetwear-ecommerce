// utils/product-utils.ts

import { ProductType } from '@/types/product-types';
import stringSimilarity from 'string-similarity';

export const shuffleArray = ({ array }: { array: ProductType[] }) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export const sortProductsByPrice = ({ array, lowToHigh = true }: { array: ProductType[], lowToHigh?: boolean }) => {
  return [...array].sort((a, b) => lowToHigh ? a['clothing-price'] - b['clothing-price'] : b['clothing-price'] - a['clothing-price']);
};

export const searchProductsWithScoring = ({ products, search }: {products: ProductType[], search: string}) => {
  if (!products || products.length === 0) {
    return { results: [], bestMatch: null };
  }

  const searchWords = search.toLowerCase().split(' ');

  const results = products
    .map(product => {
      const productWords = product['clothing-name'].toLowerCase().split(' ');
      let score = 0;
      let allWordsMatch = true;

      searchWords.forEach(searchWord => {
        let wordMatched = false;

        productWords.forEach(productWord => {
          if (productWord.startsWith(searchWord)) {
            score += 2; // starting match
            wordMatched = true;
          } else if (productWord.includes(searchWord)) {
            score += 1; // partial match
            wordMatched = true;
          } else {
            const similarity = stringSimilarity.compareTwoStrings(searchWord, productWord);
            if (similarity >= 0.7) {
              score += similarity; // similarity score
              wordMatched = true;
            }
          }
        });

        if (!wordMatched) allWordsMatch = false;
      });

      return { product, score, allWordsMatch };
    })
    .filter(item => item.allWordsMatch && item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  let bestMatch: ProductType | null = null;

  if (results.length > 0) {
    bestMatch = results[0];
  } else if (search.trim() && products.length > 0) {
    const productNames = products.map(p => p['clothing-name']);
    const bestMatchName = stringSimilarity.findBestMatch(search, productNames).bestMatch.target;
    bestMatch = products.find(p => p['clothing-name'] === bestMatchName) || null;
  }

  return { results, bestMatch };
};