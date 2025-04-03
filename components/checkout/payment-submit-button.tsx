import { ShippingOptionType } from "@/types/stripe-element-types";

type PaymentSubmitButtonParams = {
  amount: number;
  cartShippingOption: ShippingOptionType | null;
  loading: boolean;
  stripe: unknown;
  isVerifying: boolean;
}

const PaymentSubmitButton = ({
  amount,
  cartShippingOption,
  loading,
  stripe,
  isVerifying
}: PaymentSubmitButtonParams) => {
  const totalAmount = amount + (cartShippingOption ? cartShippingOption.fixed_amount.amount / 100 : 0);

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-8 w-full rounded-full text-lg ${isVerifying && "pointer-events-none"}`}
      type="submit"
      disabled={!stripe || loading}
      aria-disabled={!stripe || loading}
      aria-label={loading ? "Processing payment" : `Pay ${totalAmount} CAD`}
    >
      {!loading ? `Pay ${totalAmount} CAD` : "Processing..."}
    </button>
  );
}

export default PaymentSubmitButton;