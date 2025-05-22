import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const phoneSchema = z.object({
  phone: z.string()
    .min(11, "Номер должен содержать 11 цифр")
    .max(11, "Номер должен содержать 11 цифр")
    .regex(/^\d+$/, "Только цифры")
});

type PhoneFormData = z.infer<typeof phoneSchema>;

export const PhoneForm = ({ onSubmit }: { onSubmit: (phone: string) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema)
  });

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Вход в систему</h1>
        <p>Введите номер телефона для получения кода подтверждения</p>
      </div>
      
      <form onSubmit={handleSubmit((data) => onSubmit(data.phone))}>
        <div className="form-group">
          <label htmlFor="phone">Номер телефона</label>
          <input
            id="phone"
            className="form-control"
            {...register('phone')}
            type="tel"
            placeholder="79261234567"
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>
        
        <button type="submit" className="btn btn-primary">
          Получить код
        </button>
      </form>
      
      <div className="auth-footer">
        <p>Нажимая кнопку, вы соглашаетесь с условиями обработки данных</p>
      </div>
    </div>
  );
};