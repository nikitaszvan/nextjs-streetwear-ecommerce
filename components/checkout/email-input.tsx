// External Libraries
import { LinkAuthenticationElement } from '@stripe/react-stripe-js';

type EmailInputParams = {
  savedEmail: string;
  isVerifying: boolean;
}

const EmailInput = ({ savedEmail, isVerifying }: EmailInputParams) => {

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
            email: savedEmail || "",
          },
        }}
        onChange={(e) => saveEmailToSession(e.value.email)}
      />
    </div>
  );
};

export default EmailInput;