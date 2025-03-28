// External Libraries
import { ShoppingBag } from "lucide-react";

// Types
import { PurchaseCartType } from "@/types/cart-types";

// Service Layer
import { formatDate } from "@/lib/utils/string-utils";

// Presentation Layer
import { Separator } from "@/components/ui/separator";

const PaymentSuccessHeader = ({ orderDetails }: { orderDetails: PurchaseCartType }) => (
    <header className=" pb-0 flex flex-col" aria-labelledby="order-confirmation-title">
        <div className="flex justify-between items-center">
            <div className="">
                <h1 id="order-confirmation-title" className="text-2xl tracking-tight font-semibold">Order Confirmation</h1>
                <h2 className="text-muted-foreground text-sm mt-1">Thank you for your purchase!</h2>
            </div>
            <ShoppingBag className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>
        <div className="flex justify-between mt-10 mb-5" aria-labelledby="order-summary-title">
            <h2 id="order-summary-title" className="sr-only">Order Summary Details</h2>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Confirmation Number</p>
                <p className="text-lg font-bold">{orderDetails?.confirmation_number}</p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                <p>{formatDate(orderDetails?.order_date)}</p>
            </div>
        </div>
        <Separator className="" />
    </header>
);

export default PaymentSuccessHeader;