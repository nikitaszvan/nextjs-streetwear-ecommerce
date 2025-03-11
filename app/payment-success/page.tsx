// app/payment-success/page.tsx

import { notFound, redirect } from 'next/navigation';
import { cache, Suspense } from 'react';
import PaymentSuccessComponent from "@/components/layout/payment-success";
import getRedisClient from "@/utils/redis";


// Server Action
async function verifyPayment(key: string) {
  const redis = await getRedisClient();
  console.log(key);
  const isValid = await redis.get(key);
  if (isValid) {
    return true;
  }
  return false;
}

const cachedVerifyPayment = cache(verifyPayment);

async function PaymentSuccessContent({ newKey }: { newKey: string }) {
  console.log(newKey);
  const isValidPayment = await cachedVerifyPayment(newKey);

  if (!isValidPayment) {
    return notFound();
  }

  return <PaymentSuccessComponent />;
}


const PaymentSuccessPage = async ({
    searchParams,
  }: {
    searchParams: Promise<Record<string, string | undefined>>;
  }) => {
    const { key } = await searchParams; // Access it directly as an object


    return (
      <Suspense fallback={<p>Verifying payment...</p>}>
        {key ? <PaymentSuccessContent newKey={key} /> : null}
      </Suspense>
    );
    
};

export default PaymentSuccessPage;