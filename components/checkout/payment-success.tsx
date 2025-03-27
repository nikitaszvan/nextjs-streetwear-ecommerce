"use client"

// External Libraries
import { useState, useEffect } from "react";
import { Check, ShoppingBag, ArrowLeft, Printer } from "lucide-react";

// Presentation Layer
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Types
import { PurchaseCartType } from "@/types/cart-types";

export default function PaymentSuccess({ keyId }: { keyId: string | undefined }) {
  const [orderDetails, setOrderDetails] = useState<PurchaseCartType | null>(null);

  useEffect(() => {
    if (keyId) {
      const storedOrderDetails = localStorage.getItem(keyId);
      if (storedOrderDetails) {
        setOrderDetails(JSON.parse(storedOrderDetails));
      }
    }
  }, [keyId]);

  const handlePrint = () => {
    window.print();
  }

  const formatDate = (dateString: string | undefined): string | null => {
    if (!dateString) {
      return null;
    }

    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
      // Handle invalid date
      return null;
    }

    return dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    orderDetails ? 
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Alert className="bg-green-50 border-green-200 mb-6">
        <Check className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800 text-lg font-medium">Payment Successful</AlertTitle>
        <AlertDescription className="text-green-700">
          Your payment has been processed successfully. A confirmation email has been sent to your email address.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Order Confirmation</CardTitle>
              <CardDescription className="mt-1">Thank you for your purchase!</CardDescription>
            </div>
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Confirmation Number</p>
              <p className="text-lg font-bold">{orderDetails?.confirmation_number}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
              <p>{formatDate(orderDetails?.order_date)}</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Order Summary</h3>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails?.purchaseItems.map((item) => (
                  <TableRow key={item["unique-identifier"]}>
                    <TableCell>{item["clothing-name"]}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item["clothing-price"]}</TableCell>
                    <TableCell className="text-right">{(item["clothing-price"] * item.quantity)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="space-y-2 pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{orderDetails?.subTotal} CAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{orderDetails?.cartShippingOption.fixed_amount.amount! / 100} CAD</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{orderDetails?.subTotal! + orderDetails?.cartShippingOption.fixed_amount.amount! / 100} CAD</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-1">
            <h3 className="font-medium">Shipping Address</h3>
            <p className="text-muted-foreground">
              {orderDetails?.customerAddress.name}
              <br />
              {orderDetails?.customerAddress.address.line1}
              {orderDetails?.customerAddress.address.line2 &&
                <>
                  <br />
                  {orderDetails?.customerAddress.address.line2}
                </>
              }
              <br />
              {orderDetails?.customerAddress.address.city}, {orderDetails?.customerAddress.address.state} {orderDetails?.customerAddress.address.postal_code}
              <br />
              {orderDetails?.customerAddress.address.country}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => (window.location.href = "/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Shop
          </Button>
          <Button className="w-full sm:w-auto" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
        </CardFooter>
      </Card>
    </div>
    : null
  )
}
