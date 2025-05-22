import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const otpSchema = z.object({
  otp: z.string()
    .length(6, "Код должен содержать 6 цифр")
    .regex(/^\d+$/, "Только цифры")
});

export const OtpForm = ({ phone, onSubmit }: {
    phone: string;
    onSubmit: (otp: string) => void
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof otpSchema>>({ 
        resolver: zodResolver(otpSchema)
    });

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h1>Подтверждение номера</h1>
                <p>Код отправлен на номер {phone}</p>
            </div>
            
            <form onSubmit={handleSubmit((data) => onSubmit(data.otp))}>
                <div className="form-group">
                    <label>Код подтверждения</label>
                    <input
                        className="form-control"
                        {...register('otp')}
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Введите 6 цифр"
                    />
                    {errors.otp && (
                        <span className="error-message">{errors.otp.message}</span>
                    )}
                </div>
                
                <button type="submit" className="btn btn-primary">
                    Подтвердить
                </button>
            </form>
            
            <div className="auth-footer">
                <p>Не получили код? <a href="#">Отправить повторно</a></p>
            </div>
        </div>
    );
};