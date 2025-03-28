"use client";

// External Libraries
import { useState, useEffect } from "react";

// Presentation Layer
import PaymentSuccessAlert from "./payment-success-alert";
import PaymentSuccessButtonContainer from "./payment-success-button-container";
import PaymentSuccessHeader from "./payment-success-header";
import PaymentSuccessOrderSummary from "./payment-success-order-summary";
import PaymentSuccessShippingAddress from "./payment-success-shipping-address";

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

  return (
    orderDetails ? 
    <div className="container max-w-5xl mx-auto p-6">
      <PaymentSuccessAlert />
      <PaymentSuccessButtonContainer />
      <PaymentSuccessHeader orderDetails={orderDetails} />
      <PaymentSuccessOrderSummary orderDetails={orderDetails} />
      <PaymentSuccessShippingAddress orderDetails={orderDetails} />
    </div>
    : null
  );
}