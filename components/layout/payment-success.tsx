"use client"

import { useState, useEffect } from "react"
import { Check, ShoppingBag, ArrowLeft, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PaymentSuccessComponent({ keyId }: {keyId: string}) {
  const [confirmationNumber, setConfirmationNumber] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const generateConfirmationNumber = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let result = ""
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      return result
    }

    setConfirmationNumber(generateConfirmationNumber())

    const now = new Date()
    setCurrentDate(
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    )
  }, [])

  // Mock order items
  const orderItems = [
    { id: 1, name: "Premium Wireless Headphones", quantity: 1, price: 149.99 },
    { id: 2, name: "Smartphone Case (Black)", quantity: 1, price: 24.99 },
    { id: 3, name: "USB-C Fast Charging Cable", quantity: 2, price: 19.99 },
  ]

  // Calculate subtotal, tax, and total
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax rate
  const shipping = 5.99
  const total = subtotal + tax + shipping

  const handlePrint = () => {
    window.print()
  }

  return (
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
              <p className="text-lg font-bold">{confirmationNumber}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
              <p>{currentDate}</p>
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
                {orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="space-y-2 pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-1">
            <h3 className="font-medium">Shipping Address</h3>
            <p className="text-muted-foreground">
              John Doe
              <br />
              123 Main Street
              <br />
              Apt 4B
              <br />
              New York, NY 10001
              <br />
              United States
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
  )
}
