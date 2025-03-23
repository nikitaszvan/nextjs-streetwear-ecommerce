"use client";

import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from '@/context/cart-context';
import { ShippingOptionType } from '@/types/stripe-element-types';

const ShippingOptions = ({ show, paymentId, defaultShipping, className }: { show: boolean; paymentId: { paymentId: string, clientSecret: string }, defaultShipping: ShippingOptionType | string | null, className?: string }) => {
    const [shippingRates, setShippingRates] = useState([]);
    const [selectedRate, setSelectedRate] = useState<ShippingOptionType | string | null>(defaultShipping);

    const { dispatch, cart: { totalCartPrice } } = useCart();

    console.log(show);

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

    const saveShippingOptionToSession = (option: ShippingOptionType) => {
        sessionStorage.setItem('userShippingOptionFields', JSON.stringify(option));
    }

    const updateShippingOption = (option: ShippingOptionType) => {
        saveShippingOptionToSession(option);

        if (paymentId) {
            fetch('/api/update-stripe-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payment_intent_id: paymentId.paymentId,
                    shipping_option: option,
                    amount: totalCartPrice * 100,
                }),
            });

        }

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

    const borderClass = (option: ShippingOptionType) => {

        if (selectedRate && typeof selectedRate === 'object' && 'id' in selectedRate) {

            return selectedRate.id === option.id
                ? 'border-foreground/60 border-2'
                : 'border-[#e6e6e6]';
        } else if (typeof selectedRate === 'string') {

            return selectedRate === option.id
                ? 'border-foreground/60 border-2'
                : 'border-[#e6e6e6]';
        }

        return 'border-[#e6e6e6]';
    };

    return (
        <fieldset className={`transform transition-transform duration-300 ease-in-out ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 h-0'}`}
        >
            <RadioGroup className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                {shippingRates.map((rate: ShippingOptionType) => (
                    <div key={rate.id} className="relative">
                        <label
                            htmlFor={rate.id}
                            className={`grid content-end items-end rounded-md border shadow-sm px-2 py-2 transition-colors cursor-pointer hover:bg-neutral-50 ${borderClass(rate)}`}
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