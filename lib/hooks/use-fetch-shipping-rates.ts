// External Libraries
import { useEffect, useState } from "react";

// Types
import { ShippingOptionType } from "@/types/stripe-element-types";

const useFetchShippingRates = () => {
  const [shippingRates, setShippingRates] = useState<ShippingOptionType[] | []>([]);

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

  return shippingRates;
};

export default useFetchShippingRates;