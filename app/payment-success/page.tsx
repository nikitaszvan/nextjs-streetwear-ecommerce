
// External Libraries
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

// Presentation Layer
import PaymentSuccess from "@/components/payment-success/payment-success";

// Service Layers
import { redis } from '@/lib/config/upstash-config';

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  let key = (await searchParams)?.key;

  if (Array.isArray(key)) {
    key = key[0];
  }

  const storedSessionId: string | null = await redis.get(`order:${key}`);

  if (!storedSessionId) notFound();

  return (
    <main role="main" aria-label="Payment Success Page">
      <Suspense fallback={<div className="h-[100vh]"></div>}>
        <h1 className="sr-only">Payment Success</h1>
        <PaymentSuccess keyId={key} storedId={storedSessionId}/>
      </Suspense>
    </main>
  );
};

export default PaymentSuccessPage;