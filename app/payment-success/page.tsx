import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PaymentSuccess from "@/components/layout/payment-success";
import getRedisClient from "@/utils/redis";

// Server Action
const verifyPayment = async (key: string) => {
  const redis = await getRedisClient();
  const isValid = await redis.get(key);
  return !!isValid; // Return true if valid, false otherwise
}

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const { key } = await searchParams; // Access it directly as an object

  // Verify the payment
  const validUser = key ? await verifyPayment(key) : false;

  // If the payment is not valid, you can redirect or show a not found page
  if (!validUser) {
    return notFound(); // or you can redirect to an error page
  }

  // If valid, render the PaymentSuccess component
  return (
    <Suspense fallback={<p>Verifying payment...</p>}>
      <PaymentSuccess keyId={key} />
    </Suspense>
  );
};

export default PaymentSuccessPage;