import { useState } from 'react';
import { PhoneForm } from './components/PhoneForm';
import { OtpForm } from './components/OtpForm';
import { useMutation } from '@tanstack/react-query';
import { authApi } from './api/auth';

export default function App() {
    const [phone, setPhone] = useState<string>('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');

    const requestOtpMutation = useMutation({
        mutationFn: authApi.requestOtp,
        onSuccess: () => setStep('otp')
    });

    const signInMutation = useMutation({
        mutationFn: (otp: string) => authApi.signIn(phone, otp),
        onSuccess: () => {
            alert('Успешный вход!');
        }
    });

    return (
        <div className="auth-container">
            {step === 'phone' ? (
                <PhoneForm onSubmit={(phone) => {
                    setPhone(phone);
                    requestOtpMutation.mutate(phone);
                }} />
            ) : (
                <OtpForm
                    phone={phone} 
                    onSubmit={(otp) => signInMutation.mutate(otp)}
                />
            )}
        </div>
    );
}