// External Libraries
import { Check } from "lucide-react";

// Presentation Layer
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PaymentSuccessAlert = () => (
  <Alert className="bg-green-50 border-green-200 mb-6" role="alert" aria-live="assertive">
    <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
    <AlertTitle className="text-green-800 text-lg font-medium">Payment Successful</AlertTitle>
    <AlertDescription className="text-green-700">
      Your payment has been processed successfully. A confirmation email has been sent to your email address.
    </AlertDescription>
  </Alert>
);

export default PaymentSuccessAlert;