// External Libraries
import Link from "next/link";

// Presentation Layer
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

const CartSummaryConfirm = ({ totalCartPrice }: { totalCartPrice: number }) => (
  <div className="mt-4">
    <Card>
      <CardContent className="p-6" aria-labelledby="order-summary-title">
        <h2 id="order-summary-title" className="font-semibold text-lg mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between" aria-label="Subtotal">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">CAD {totalCartPrice}</span>
          </div>
          <div className="flex justify-between" aria-label="Shipping">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">Calculated at checkout</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold" aria-label="Total">
            <span>Total</span>
            <span>CAD {totalCartPrice}</span>
          </div>
          <Link href="/checkout" passHref>
            <Button className="w-full my-2" size="lg" aria-label="Proceed to checkout">
              Confirm Cart
            </Button>
          </Link>
          <Link href="/all-products" passHref>
            <Button variant="outline" className="w-full my-2" size="lg" aria-label="Continue shopping">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default CartSummaryConfirm;