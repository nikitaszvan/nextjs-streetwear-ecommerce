export type StripeShippingAddressType = {
    name: string,
    phone: string,
    address: {
        city: string,
        country: string,
        line1: string,
        line2: string,
        postal_code: string,
        state: string
    }
};

export type ShippingOptionType = {
    id: string;
    object: string;
    active: boolean;
    created: number;
    delivery_estimate: {
        maximum: {
            unit: string;
            value: number;
        };
        minimum: {
            unit: string;
            value: number;
        };
    };
    display_name: string;
    fixed_amount: {
        amount: number;
        currency: string;
    };
    livemode: boolean;
    metadata: Record<string, string>;
    tax_behavior: string;
    tax_code: string | null;
    type: string;
};

export type BillingOptionType = {
    billingDetails: {
        name: string;
        email: string;
        phone: string;
        address: {
            postal_code: string;
            country: string;
        }
    }
}