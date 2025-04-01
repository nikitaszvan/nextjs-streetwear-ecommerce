// External Libraries
import { LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const EmailInput = ({ savedEmail, isVerifying, renderKey }: { savedEmail: string, isVerifying: boolean, renderKey: string }) => {

  const saveEmailToSession = (email: string) => {
    const userEmailField = JSON.stringify(email);
    sessionStorage.setItem('userEmailFields', userEmailField);
  };

  return (
    <div aria-live="polite" aria-busy={isVerifying} className={`${isVerifying && "pointer-events-none"}`}>
      <label htmlFor="email-input" className="sr-only">Email Address</label>
      <LinkAuthenticationElement
        key={ renderKey }
        id="email-input"
        options={{
          defaultValues: {
            email: savedEmail || "",
          },
        }}
        onChange={(e) => saveEmailToSession(e.value.email)}
      />
    </div>
  );
};

export default EmailInput;