"use client"

import { AddressElement } from "@stripe/react-stripe-js";
import ShippingOptions from "./shipping-options";
import { useEffect, useState } from "react";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js/dist";
import { useCart } from "@/context/cart-context";
import { ShippingOptionType, StripeShippingAddressType } from "@/types/stripe-element-types";


const ShippingOptionsWrapper = ({ 
    paymentId,
    shipping,
    defaultShippingAddress,
    className,
    shippingOptions
}: { 
    paymentId: { paymentId: string , clientSecret: string },
    shipping: ShippingOptionType | string | null,
    defaultShippingAddress?: StripeShippingAddressType,
    className?: string,
    shippingOptions: ShippingOptionType[] | []
}) => {
    const [isValid, setIsValid] = useState(false);
    const [addressKey, setAddressKey] = useState(0);
    const [shippingsOptionsKey, setShippingsOptionKey] = useState(0);
    const [addressDefaultValues, setAddressDefaultValues] = useState<StripeShippingAddressType>(
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
    );

    let passedShipping = shipping;

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
    }

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

                onChange={(e) => {
                    setAddressDefaultValues(() => {

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

                        return activeValues;
                    });
                }}

                className={`z-10 bg-white ${className}`}
            />
            <ShippingOptions key={shippingsOptionsKey + 'ship-key'} shippingOptions={shippingOptions} show={handlePostalCheck(addressDefaultValues.address.postal_code)} paymentId={paymentId} defaultShipping={passedShipping} className={className} />
        </>
    )
}

export default ShippingOptionsWrapper
