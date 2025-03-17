"use client"

import { AddressElement } from "@stripe/react-stripe-js";
import ShippingOptions from "./shipping-options";
import { useEffect, useState } from "react";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js/dist";
import { useCart } from "@/context/cart-context";
import { StripeShippingAddressType } from "@/types/stripe-element-types";


const ShippingOptionsWrapper = ({ paymentId, defaultShippingAddress, className }: { paymentId: string, defaultShippingAddress?: StripeShippingAddressType, className?: string }) => {
    const [isValid, setIsValid] = useState(false);
    const [addressKey, setAddressKey] = useState(0);
    const [addressDefaultValues, setAddressDefaultValues] = useState(
        {
            name: "",
            phone: "",
            address: {
                line1: "",
                line2: "",
                city: "",
                country: "CA",
                postal_code: "",
                state: ""
            }
        }
    )

    const { cart: { cartShippingOption } } = useCart();

    const handleChange = (event: StripeAddressElementChangeEvent) => {
        const postalCode = event.value.address.postal_code;
        if (postalCode) {
            const validCheck = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
            setIsValid(validCheck);
        }
    };

    useEffect(() => {
        if (defaultShippingAddress) {
            setAddressDefaultValues({
                name: defaultShippingAddress.name || "",
                phone: defaultShippingAddress.phone || "",
                address: defaultShippingAddress.address || {
                    line1: "",
                    line2: "",
                    city: "",
                    country: "",
                    postal_code: "",
                    state: ""
                }
            })
            setAddressKey(prevKey => prevKey + 1);
        }
    }, [defaultShippingAddress]);

    return (
        <>
            <AddressElement
                key={addressKey}
                options={{
                    mode: "shipping",
                    fields: { phone: "always" },
                    validation: { phone: { required: "auto" } },
                    defaultValues: addressDefaultValues
                }}
                onChange={handleChange}
                className={`z-10 bg-white ${className}`}
            />
            <ShippingOptions show={isValid} paymentId={paymentId} defaultShipping={cartShippingOption} className={className}/>
        </>
    )
}

export default ShippingOptionsWrapper
