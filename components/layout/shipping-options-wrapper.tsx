"use client"

import { AddressElement } from "@stripe/react-stripe-js";
import ShippingOptions from "./shipping-options";
import { useState, useEffect } from "react";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js/dist";


const ShippingOptionsWrapper = () => {
    const [isValid, setIsValid] = useState(false);

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
                    validation: { phone: { required: "auto" } }
                }}
                onChange={handleChange} 
                className="z-10 bg-white"   
                />
            <ShippingOptions show={isValid} />
        </>
    )
}

export default ShippingOptionsWrapper
