// External Libraries
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

// Presentation Layer
import PaymentSuccess from "@/components/payment-success/payment-success";

// Service Layers
import getRedisClient from "@/lib/utils/redis-client-utils";

const verifyPayment = async (key: string) => {
  const redis = await getRedisClient();
  const isValid = await redis.get(key);
  return !!isValid;
}

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const { key } = await searchParams;

  const validUser = key ? await verifyPayment(key) : false;

  if (!validUser) {
    return notFound();
  }

  return (
    <main role="main" aria-label="Payment Success Page">
      <Suspense fallback={<p>Verifying payment...</p>}>
        <h1 className="sr-only">Payment Success</h1>
        <PaymentSuccess keyId={key} />
      </Suspense>
    </main>
  );
};

export default PaymentSuccessPage;