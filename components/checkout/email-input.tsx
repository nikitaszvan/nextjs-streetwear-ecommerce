// External Libraries
import { LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const EmailInput = ({ savedEmail, isVerifying }: { savedEmail: string, isVerifying: boolean }) => {
  const [defaultEmail, setDefaultEmail] = useState(savedEmail);

  const saveEmailToSession = (email: string) => {
    const userEmailField = JSON.stringify(email);
    sessionStorage.setItem('userEmailFields', userEmailField);
  };

  return (
    <div aria-live="polite" aria-busy={isVerifying} className={`${isVerifying && "pointer-events-none"}`}>
      <label htmlFor="email-input" className="sr-only">Email Address</label>
      <LinkAuthenticationElement
        id="email-input"
        options={{
          defaultValues: {
            email: defaultEmail,
          },
        }}
        onChange={(e) => {
          setDefaultEmail(() => {
            const activeEmail = e.value.email;
            saveEmailToSession(activeEmail);
            return activeEmail;
          });
        }}
      />
    </div>
  );
};

export default EmailInput;