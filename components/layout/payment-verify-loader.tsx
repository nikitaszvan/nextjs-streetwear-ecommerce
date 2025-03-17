"use client"

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentVerifyLoader() {

    return (
        <Card className="w-[20rem] h-[25rem] flex flex-col items-center justify-center shadow-lg fixed z-30 ml-[5.2rem]">
            <CardContent className="flex flex-col items-center justify-center h-full w-full p-6 space-y-6">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">Please wait while we verify your payment...</p>
                </div>
            </CardContent>
        </Card>
    )
}
