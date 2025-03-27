// External Libraries
import { LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const EmailInput = ({ savedEmail, isVerifying }: { savedEmail: string, isVerifying: boolean }) => {

    const [defaultEmail, setDefaultEmail] = useState(savedEmail);

    const saveEmailToSession = (email: string) => {
        const userEmailField = JSON.stringify(email);

        sessionStorage.setItem('userEmailFields', userEmailField);
    }

    return (
        <LinkAuthenticationElement
            options={{
                defaultValues: {
                    email: defaultEmail,
                },
            }}
            className={`${isVerifying && "pointer-events-none"}`}

            onChange={(e) => {
                setDefaultEmail(() => {
                    const activeEmail = e.value.email;
                    saveEmailToSession(activeEmail);
                    return activeEmail;
                });
            }}
        />
    )
}

export default EmailInput