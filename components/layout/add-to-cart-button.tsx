"use client"

import { ProductType } from "@/types/product-types";
import { CartProductType, ProductVariantType } from "@/types/cart-types";
import { useCart } from "@/context/cart-context";
import { ColorType } from "@/types/cart-types";

type AddToButtonType = {
  product: ProductType & ProductVariantType;
  active: boolean;
}

const AddToCartButton = ({product, active}: AddToButtonType) => {
    const { dispatch } = useCart();

    const handleAddToCart = () => {

        const cartItem: CartProductType = {
          ...product,
          "unique-identifier": product['category_pk'] + product['sort_key'] + product.color!.name + product.size,
          quantity: 1,
        };

    
        dispatch({ type: 'ADD_ITEM', payload: cartItem });
        dispatch({ type: 'SHOW_CART_PREVIEW' });
      };
    
  
    return (
        <button onClick={handleAddToCart} className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow h-10 px-8 rounded-full text-lg relative ${!active && 'bg-gray-500'}`} id="button-add-to-cart" type="button" disabled={!active}>
            <span className="transition-opacity ease-in opacity-100">Add to cart</span>
            <span className="ease-out transition-opacity pointer-events-none absolute z-10 opacity-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle h-4 w-4 animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
            </span>
        </button>
  )
}

export default AddToCartButton;