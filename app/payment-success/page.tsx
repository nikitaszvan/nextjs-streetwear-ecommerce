import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import PaymentSuccess from "@/components/checkout/payment-success";
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
    <Suspense fallback={<p>Verifying payment...</p>}>
      <PaymentSuccess keyId={key} />
    </Suspense>
  );
};

export default PaymentSuccessPage;