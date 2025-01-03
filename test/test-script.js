// test/test-script.js

const urls = [
  "https://assets.lummi.ai/assets/QmYhd1nKQGRCNEbsbG6Xvrnfr6xGu3VKAZVTaDDxxoZRkF?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmVqZpQ19MZoNZrbdVh4avcucUpEsewnu5tCDaxAGwHa2b?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmXWVYWBStdpuqFRwvBS9VQC7YUYVKY6bqxQVcWcpaQz3M?auto=format&w=1500",
  "https://assets.lummi.ai/assets/Qmex33rqbi9BVqVViaSNfXZxdhdDVeMe1ZRFu3kLMpFdy4?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmQx1wxfhHVfg74EftiYAzGquA5ZRNHfJKxd5jM1d3gWRi?auto=format&w=1500",
  "https://assets.lummi.ai/assets/Qmb7LKJa5mKwtDGVpKZyTvvQgrBn76fHndHKgtJnD9PWyc?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmZmC11ASmC8aUbfwEeRyhAn6BPZEk7D4beR2712XesdX5?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmY1X2Bz6qhTdgUJ4sMwKXyJnDatTxJY9fADkRCMxpD16b?auto=format&w=1500",
  "https://assets.lummi.ai/assets/Qmc5bWaaeKsGptNLbc4M4Y7A1LdTnBEevfL6zt25UW4Z3M?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmTdJRz2KVzdKvXAjLPGLCgyLomT86RrLBiWzJHR2jWe9J?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmTJtGyebcqnD88PyrQVrfixectD3cR6oqwXnzVR4joLwK?auto=format&w=1500",
  "https://assets.lummi.ai/assets/Qme6hLZMZUpAoTTHGhbcTWVaRE5k4zcrxcQ1CVktAL4WNp?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmSkoHGpX4SRydMPGTKzVihCt88VfkE8HSkQm8Dxtu7Tt9?auto=format&w=1500",
  "https://assets.lummi.ai/assets/Qme9Go3oTCzeLvWw62qzWerQghgDT47rDLvckHYb9ezTfV?auto=format&w=1500",
  "https://assets.lummi.ai/assets/Qme2bCfWNKiX8ZiaH4S3U7iaf6jZybnHEELp8kyeijn5me?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmUBZ8ajhT5x26mc7qmMgWHBjW7msjmysa3FrPt5Ln2ph3?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmUwY4r5ZSsrpMKnfkqyb7YVvC9ZTUFdeCGMuHViDbwgPh?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmTmJBCFDJN7TsiK77pvmNAF9XjWgPurUebNu3rLnYnQHj?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmPSuqtrpdKFZNv1Doui7URNz7Fn3Cun86NUYGNXFLAgzY?auto=format&w=1500",
  "https://assets.lummi.ai/assets/QmQm4BBLvviaQdnRZQoyq2z1PfjS9Hwg3u9kyDAkxgmyFk?auto=format&w=1500"
];

const coatNames =  [
  "Urban Chronograph Elite",
  "Metro Time Sovereign",
  "Street Force Automatic",
  "City Pulse Skeleton",
  "Urban Command Digital",
  "Street Core Mechanical",
  "Metro Edge Chronograph",
  "Urban Legacy Automatic",
  "City Scout Digital",
  "Street Wave Mechanical",
  "Urban Element Skeleton",
  "Metro Vision Chronograph",
  "Street Echo Automatic",
  "City Flow Digital",
  "Urban Drift Mechanical",
  "Street Tech Skeleton",
  "Metro Force Digital",
  "Urban Time Automatic",
  "City Edge Chronograph",
  "Street Elite Mechanical"
];

const coatPrices = [
  299,  // Urban Chronograph Elite
  449,  // Metro Time Sovereign
  529,  // Street Force Automatic
  399,  // City Pulse Skeleton
  249,  // Urban Command Digital
  479,  // Street Core Mechanical
  329,  // Metro Edge Chronograph
  549,  // Urban Legacy Automatic
  279,  // City Scout Digital
  499,  // Street Wave Mechanical
  419,  // Urban Element Skeleton
  349,  // Metro Vision Chronograph
  529,  // Street Echo Automatic
  259,  // City Flow Digital
  469,  // Urban Drift Mechanical
  429,  // Street Tech Skeleton
  289,  // Metro Force Digital
  519,  // Urban Time Automatic
  339,  // City Edge Chronograph
  489   // Street Elite Mechanical
];


// const fetch = await import('node-fetch').then(mod => mod.default);
import addCategoryImages from "../hooks/add-cat-images.js";

const uploadImages = async () => {
  try {
    const response = await addCategoryImages('accessories-men', urls, coatNames, coatPrices);

    if (!response.httpStatusCode == 200) {
      throw new Error('Failed to upload images');
    }
    } catch (err) {
      console.error('Error:', err);
    }
  }

uploadImages();

