"use client"

// External Libraries
import { Loader2 } from "lucide-react";

// Presentation Layer
import { Card, CardContent } from "@/components/ui/card";

const CartLoader = () => {

    return (
        <Card className="flex flex-col items-center justify-center border-none">
            <CardContent className="flex flex-col items-center justify-center h-full w-full p-6 space-y-6">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Loading Cart</h3>
                </div>
            </CardContent>
        </Card>
    )
};

export default CartLoader;
