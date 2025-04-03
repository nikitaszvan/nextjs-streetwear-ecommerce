"use client";

// External Libraries
import { useState, useEffect } from "react";

// Presentation Layer
import PaymentSuccessAlert from "./success-alert";
import PaymentSuccessButtonContainer from "./button-container";
import PaymentSuccessHeader from "./header";
import PaymentSuccessOrderSummary from "./order-summary";
import PaymentSuccessShippingAddress from "./shipping-address";

// Types
import { PurchaseCartType } from "@/types/cart-types";

const PaymentSuccess = ({ keyId }: { keyId: string | undefined }) => {
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
};

export default PaymentSuccess;