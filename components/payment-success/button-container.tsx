// External Libraries
import { ArrowLeft, Printer } from "lucide-react";

// Presentation Layer
import { Button } from "@/components/ui/button";

const ButtonContainer = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-10 mb-8 print:hidden" role="group" aria-label="Payment Success Actions">
      <Button
        variant="outline"
        className="w-full sm:w-auto"
        onClick={() => (window.location.href = "/")}
        aria-label="Return to Shop"
      >
        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Return to Shop
      </Button>
      <Button
        className="w-full sm:w-auto"
        onClick={handlePrint}
        aria-label="Print Receipt"
      >
        <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
        Print Receipt
      </Button>
    </div>
  );
};

export default ButtonContainer;