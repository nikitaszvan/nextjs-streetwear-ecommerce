"use client"

import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ErrorMessageType = {
    main: string,
    sub: string
};

export default function PaymentVerifyLoader({ paymentId }: { paymentId: string | undefined}) {
    const [validPayment, setValidPayment] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageType>({ main: '', sub: '' });
    const router = useRouter();

    useEffect(() => {
        const checkPaymentStatus = async (id: string) => {
            try {
                const response = await fetch('/api/get-payment-status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ payment_intent: id }),
                });
    
                const data = await response.json();

                if (data.last_payment_error === null) {
                    const timer = setTimeout(() => {
                        setValidPayment(true);
                        router.push(`/payment-success?key=${paymentId}`);
                      }, 4000);
        
                      return () => clearTimeout(timer);
                    
                } else {
                    const { code, message } = data.last_payment_error;
                    setErrorMessage({
                        main: code,
                        sub: message
                    });
                    setValidPayment(false);
                }
            } catch (error) {
                console.error('Error checking payment status:', error);
            }
        };
        if (paymentId) checkPaymentStatus(paymentId);
    }, [paymentId]);


    return (
        <Card className="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex flex-col items-center justify-center shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-full w-full p-6 space-y-6">
                { validPayment === null ?
                    <>
                        <Loader2 className="h-16 w-16 animate-spin text-primary" />
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-semibold">Order Processing</h3>
                            <p className="text-sm text-muted-foreground">Please wait while we verify your payment...</p>
                        </div>
                    </>
                    : validPayment === false ?
                    <>
                        <h3>{errorMessage.main}</h3>
                        <p>{errorMessage.sub}</p>
                    </>
                    : null
                }
            </CardContent>
        </Card>
    )
}
