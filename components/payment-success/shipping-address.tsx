// Presentation Layer
import { CardContent } from "@/components/ui/card";

// Types
import { PurchaseCartType } from "@/types/cart-types";

const ShippingAddress = ({ orderDetails }: { orderDetails: PurchaseCartType }) => {
  const {
    customerAddress: {
      name,
      address: { line1, line2, city, state, postal_code, country }
    }
  } = orderDetails || { customerAddress: { address: {} } };

  return (
    <CardContent className="p-0">
      <div className="space-y-1">
        <h3 className="font-medium">Shipping Address</h3>
        <p className="text-muted-foreground">
          {name}
          <br />
          {line1}
          {line2 && (
            <>
              <br />
              {line2}
            </>
          )}
          <br />
          {city}, {state} {postal_code}
          <br />
          {country}
        </p>
      </div>
    </CardContent>
  );
};

export default ShippingAddress;