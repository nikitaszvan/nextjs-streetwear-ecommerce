"use client"

import { AddressElement } from "@stripe/react-stripe-js";
import ShippingOptions from "./shipping-options";
import { useState } from "react";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js/dist";
import { useCart } from "@/context/cart-context";
import { StripeShippingAddressType } from "@/types/stripe-element-types";


const ShippingOptionsWrapper = ({ paymentId, defaultShippingAddress }: { paymentId: string, defaultShippingAddress: StripeShippingAddressType }) => {
    const [isValid, setIsValid] = useState(false);
    
    const { cart: { cartShippingOption } } = useCart();

    const handleChange = (event: StripeAddressElementChangeEvent) => {
        const postalCode = event.value.address.postal_code;
        if (postalCode) {
            const validCheck = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
            setIsValid(validCheck);
        }
    };

    return (
        <>
            <AddressElement
                options={{
                    mode: "shipping",
                    fields: { phone: "always" },
                    validation: { phone: { required: "auto" } },
                    defaultValues: 
                    {
                        name: defaultShippingAddress.name,
                        phone: defaultShippingAddress.phone,
                        address: defaultShippingAddress.address
                    }
                }}
                onChange={handleChange}
                className="z-10 bg-white"
            />
            <ShippingOptions show={isValid} paymentId={paymentId} defaultShipping={cartShippingOption ? cartShippingOption : undefined} />
        </>
    )
}

export default ShippingOptionsWrapper
