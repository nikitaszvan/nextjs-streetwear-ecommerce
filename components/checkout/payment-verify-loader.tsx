"use client"

// External Libraries
import { Loader2 } from "lucide-react";

// Presentation Layer
import { Card, CardContent } from "@/components/ui/card";

const PaymentVerifyLoader = () => {

    return (
        <Card className="h-[15rem] w-[15rem] lg:h-[25rem] flex flex-col items-center justify-center fixed self-center md:mt-8 shadow-lg z-30">
            <CardContent className="flex flex-col items-center justify-center h-full w-full p-6 space-y-6">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">Please wait while we verify your payment...</p>
                </div>
            </CardContent>
        </Card>
    )
};

export default PaymentVerifyLoader;
