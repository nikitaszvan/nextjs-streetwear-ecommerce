// External Libraries
import classNames from "classnames";
import { Truck } from "lucide-react";

// Presentation Layer
import CartItemRow from './table-item-row';

// Types
import { CartAction, CartProductType } from "@/types/cart-types";
import { Dispatch } from "react";
import { ShippingOptionType } from "@/types/stripe-element-types";

type TableParams = {
  items: CartProductType[] | [];
  editable: boolean;
  dispatch: Dispatch<CartAction>;
  cartShippingOption: ShippingOptionType | null;
  totalCartPrice: number;
}

const Table = ({
  items,
  editable,
  dispatch,
  cartShippingOption,
  totalCartPrice
}: TableParams) => (
  <div className="relative w-full overflow-auto">
    <table className="w-full caption-bottom text-sm table-fixed" aria-labelledby="cart-summary-title">
      <caption id="cart-summary-title" className="sr-only">Cart Summary</caption>
      <thead>
        <tr className="border-b transition-colors hover:bg-muted/50">
          <th scope="col" className="h-10 px-2 text-left align-middle font-medium text-muted-foreground hidden w-24 sm:table-cell">
            <span className="sr-only">Image</span>
          </th>
          <th scope="col" className={classNames("h-10 px-2 text-left align-middle font-medium text-muted-foreground w-1/2", { "text-lg": editable })}>
            Product
          </th>
          <th scope="col" className={classNames("h-10 px-2 text-left align-middle font-medium text-muted-foreground w-1/6", { "text-lg text-center": editable })}>
            Price
          </th>
          <th scope="col" className={classNames("h-10 px-2 text-left align-middle font-medium text-muted-foreground w-[10%] min-w-32", { "text-lg text-center": editable })}>
            Quantity
          </th>
          <th scope="col" className={classNames("h-10 px-2 align-middle font-medium text-muted-foreground w-1/6 min-w-32 text-right", { "text-lg": editable })}>
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <CartItemRow key={index} item={item} editable={editable} dispatch={dispatch} />
        ))}
        {!editable && cartShippingOption && (
          <tr className="transition-all hover:bg-muted/50 translate-y-0 opacity-100 h-14 border-t">
            <td className="">
              <Truck className="mx-auto" aria-hidden="true" />
            </td>
            <td className="pl-2">
              <strong>Shipping:</strong> {cartShippingOption.display_name}
            </td>
            <td className="w-0"></td>
            <td className="w-0"></td>
            <td className="align-middle text-right font-bold p-2">
              {cartShippingOption.fixed_amount.amount / 100}
            </td>
          </tr>
        )}
      </tbody>
      {!editable && (
        <tfoot className="border-t bg-muted/50 font-medium">
          <tr className="border-b transition-colors hover:bg-muted/50 text-lg font-bold">
            <td className="p-2 align-middle hidden w-24 sm:table-cell"></td>
            <td className="p-2 align-middle text-right" colSpan={3}>
              TOTAL
            </td>
            <td className="p-2 align-middle text-right">
              <span className={classNames("relative tabular-nums text-foreground", { "text-lg": editable })}>
                CAD {totalCartPrice + (cartShippingOption ? cartShippingOption.fixed_amount.amount / 100 : 0)}
              </span>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  </div>
);

export default Table;