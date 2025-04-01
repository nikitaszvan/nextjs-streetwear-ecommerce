"use client";

// Context
import { useCart } from "@/context/cart-context";

// Types
import { ProductType } from "@/types/product-types";
import { CartProductType, ProductVariantType } from "@/types/cart-types";

// Presentation Layer
import { Button } from "../../ui/button";

type AddToButtonType = {
  product: ProductType & ProductVariantType;
  active: boolean;
};

const AddToCartButton = ({ product, active }: AddToButtonType) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartProductType = {
      ...product,
      "unique-identifier": product['category_pk'] + product['sort_key'] + product.color!.name + product.size,
      quantity: 1,
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    dispatch({ type: 'SHOW_CART_PREVIEW', payload: true });
  };

  return (
    <Button
      onClick={handleAddToCart}
      className={`rounded-full text-base mt-10`}
      id="button-add-to-cart"
      type="button"
      disabled={!active}
      aria-disabled={!active}
      aria-label={`Add ${product['clothing-name']} to cart`}
    >
      <span className="transition-opacity ease-in opacity-100">Add to cart</span>
      <span className="ease-out transition-opacity pointer-events-none absolute z-10 opacity-0" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader-circle h-4 w-4 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
      </span>
    </Button>
  );
};

export default AddToCartButton;