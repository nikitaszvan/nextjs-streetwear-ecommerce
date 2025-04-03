// Presentation Layer
import { CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Types
import { PurchaseCartType } from "@/types/cart-types";

const OrderSummary = ({ orderDetails }: { orderDetails: PurchaseCartType }) => {


    return (
        <CardContent className="p-0 my-10">
            <div className="space-y-4 my-4">
                <h3 className="font-medium text-lg">Order Summary</h3>
                <Table aria-label="Order Summary Table" className="mb-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead scope="col">Item</TableHead>
                            <TableHead scope="col" className="text-right">Qty</TableHead>
                            <TableHead scope="col" className="text-right">Price</TableHead>
                            <TableHead scope="col" className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderDetails?.purchaseItems.map((item) => (
                            <TableRow key={item["unique-identifier"]}>
                                <TableCell>
                                    <div className="flex">
                                        <span className="w-1 bg-black mr-2" />
                                        <div>
                                            <p className="font-semibold text-base">{item["clothing-name"]}</p>
                                            <p className="text-muted-foreground text-sm">Colour: {item.color?.name}, Size: {item.size}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">{item["clothing-price"]}</TableCell>
                                <TableCell className="text-right">{(item["clothing-price"] * item.quantity)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{orderDetails?.subTotal} CAD</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping: {orderDetails?.cartShippingOption.display_name} ({orderDetails?.cartShippingOption.delivery_estimate.minimum.value}{(orderDetails?.cartShippingOption.delivery_estimate.minimum.value !== orderDetails?.cartShippingOption.delivery_estimate.maximum.value) && `-${orderDetails?.cartShippingOption.delivery_estimate.maximum.value}`} business day{orderDetails?.cartShippingOption.delivery_estimate.maximum.value > 1 && 's'})</span>
                        <span>{orderDetails?.cartShippingOption.fixed_amount.amount / 100} CAD</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{orderDetails?.subTotal + orderDetails?.cartShippingOption.fixed_amount.amount / 100} CAD</span>
                    </div>
                </div>
            </div>
        </CardContent>
    );
};

export default OrderSummary;