"use client";

import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from '@/context/cart-context';
import { ShippingOptionType } from '@/types/cart-types';

const ShippingOptions = ({ show, paymentId, defaultShipping }: { show: boolean; paymentId: string, defaultShipping?: ShippingOptionType }) => {
    const [shippingRates, setShippingRates] = useState([]);
    const [selectedRate, setSelectedRate] = useState<ShippingOptionType | null>(defaultShipping || null);

    const { dispatch, cart: { totalCartPrice } } = useCart();

    useEffect(() => {
        const fetchShippingRates = async () => {
            try {
                const response = await fetch('/api/get-shipping-rates');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setShippingRates(data.data);
            } catch (error) {
                console.error('Error fetching shipping rates:', error);
            }
        };

        fetchShippingRates();
    }, []);

    const updateShippingOption = (option: ShippingOptionType) => {
        fetch('/api/update-shipping-option', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payment_intent_id: paymentId,
                shipping_option: option,
                amount: totalCartPrice * 100,
            }),
        })
            .then((res) => res.json());
    };

    const handleSelect = (shippingOption: ShippingOptionType) => {
        setSelectedRate(() => {
            updateShippingOption(shippingOption);
            return shippingOption;
        });
        dispatch({
            type: 'ADD_SHIPPING_TO_CART',
            payload: shippingOption
        });
    };

    return (
        <fieldset className={`transform transition-transform duration-300 ease-in-out ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 h-0'}`}
        >
            <RadioGroup className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                {shippingRates.map((rate: ShippingOptionType) => (
                    <div key={rate.id} className="relative">
                        <label
                            htmlFor={rate.id}
                            className={`grid content-end items-end rounded-md border shadow-sm px-2 py-2 transition-colors cursor-pointer hover:bg-neutral-50 ${selectedRate?.id === rate.id ? 'border-foreground/60 border-2' : 'border-[#e6e6e6]'
                                }`}
                        >
                            <RadioGroupItem
                                id={rate.id}
                                value={rate.id}
                                className="sr-only"
                                onClick={() => handleSelect(rate)}
                            />
                            <p className="text-sm font-medium">{rate.display_name}</p>
                            {rate.delivery_estimate && (
                                <p className="text-sm text-muted-foreground">
                                    {rate.delivery_estimate.minimum.value}{(rate.delivery_estimate.minimum.value !== rate.delivery_estimate.maximum.value) && `-${rate.delivery_estimate.maximum.value}`} business day{rate.delivery_estimate.maximum.value > 1 && 's'}
                                </p>
                            )}
                            {rate.fixed_amount && (
                                <p className="mt-0.5 text-sm font-semibold">
                                    {rate.fixed_amount.amount / 100} CAD
                                </p>
                            )}
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </fieldset>
    );
};

export default ShippingOptions;