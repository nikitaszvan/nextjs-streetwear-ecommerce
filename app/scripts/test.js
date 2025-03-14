const checkPaymentStatus = async (paymentIntentId) => {


  const response = await fetch(`app/api/get-payment-status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIntentId: paymentIntentId }),
  });

  
    const data = await response.json();
  
    if (data.status === 'succeeded') {
      clearInterval(interval);
    //   window.location.href = `/success?payment_intent=${paymentIntentId}`;
    } else if (data.status === 'failed') {
      clearInterval(interval);
      console.error('Payment failed');
      // Handle failure (e.g., show an error message)
    }
  };

checkPaymentStatus('pi_3R1zBq08xANlkojK0yj5Yhgj');