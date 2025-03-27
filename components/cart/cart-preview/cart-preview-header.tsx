// External Libraries
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dispatch } from "react";

// Types
import { CartAction } from "@/types/cart-types";

type CartHeaderParams = {
  justAddedProduct: boolean;
  dispatch: Dispatch<CartAction>;
};

const CartPreviewHeader = ({
  justAddedProduct,
  dispatch,
}: CartHeaderParams) => {

  const closeCartPreview = () => {
    dispatch({ type: 'HIDE_CART_PREVIEW' });
  };

  return (
    <header className="w-full flex items-center justify-between p-4 lg:px-6 title-3" aria-labelledby="cart-header-title">
      <h1 id="cart-header-title" className="line-clamp-1 w-full font-semibold text-lg">
        {justAddedProduct ? 'Added to Cart!' : 'Shopping Cart'}
      </h1>
      <button onClick={closeCartPreview} type="button" aria-label="Close Cart Preview" className="">
        <Cross1Icon aria-hidden="true" className="block shrink-0 w-$w h-$h" />
      </button>
    </header>
  );
};

export default CartPreviewHeader;