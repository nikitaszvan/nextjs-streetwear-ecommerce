"use client"

import { AddressElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import ShippingOptions from "./shipping-options";
import { ShippingOptionType, StripeShippingAddressType } from "@/types/stripe-element-types";

const ShippingOptionsWrapper = ({
    paymentId,
    defaultShippingAddress,
    className,
    shippingOptions,
    isVerifying
}: {
    paymentId: { paymentId: string, clientSecret: string },
    defaultShippingAddress?: StripeShippingAddressType,
    className?: string,
    shippingOptions: ShippingOptionType[] | [],
    isVerifying: boolean
}) => {
    const [addressDefaultValues, setAddressDefaultValues] = useState<StripeShippingAddressType | undefined>(defaultShippingAddress);

    const handlePostalCheck = (code: string) => {
        if (code) {
            const validCheck = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(code);
            if (validCheck) return true;
        }
        return false;
    };

    const saveAddressToSession = (addressDefaultValues: StripeShippingAddressType) => {
        const userAddressFields = JSON.stringify(addressDefaultValues);
        sessionStorage.setItem('userAddressFields', userAddressFields);
    };

    useEffect(() => {
        if (defaultShippingAddress && JSON.stringify(defaultShippingAddress) !== JSON.stringify(addressDefaultValues)) {
            setAddressDefaultValues(defaultShippingAddress);
        }
    }, [defaultShippingAddress, addressDefaultValues]);

    return (
        <>
            <AddressElement
                options={{
                    mode: "shipping",
                    fields: { phone: "always" },
                    validation: { phone: { required: "auto" } },
                    defaultValues: addressDefaultValues
                }}
                onChange={(e) => {
                    const activeValues = {
                        name: e.value.name,
                        phone: e.value.phone ?? "",
                        address: {
                            city: e.value.address.city,
                            country: e.value.address.country,
                            line1: e.value.address.line1,
                            line2: e.value.address.line2 ?? "",
                            postal_code: e.value.address.postal_code,
                            state: e.value.address.state ?? "",
                        }
                    };

                    saveAddressToSession(activeValues);
                    setAddressDefaultValues(activeValues);
                }}
                className={`z-10 bg-white ${className}`}
            />
            <ShippingOptions
                shippingOptions={shippingOptions}
                show={addressDefaultValues ? handlePostalCheck(addressDefaultValues.address.postal_code) : false}
                paymentId={paymentId}
                isVerifying={isVerifying}
            />
        </>
    );
}

export default ShippingOptionsWrapper;
