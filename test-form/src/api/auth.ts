export const authApi = {
  requestOtp: (phone: string) => 
    new Promise((resolve) => {
      console.log(`Мок: OTP запрошен для номера ${phone}`);
      setTimeout(() => resolve({ data: { success: true } }), 1000);
    }),

  signIn: (phone: string, otp: string) => 
    new Promise((resolve) => {
      console.log(`Мок: Вход по номеру ${phone} с OTP ${otp}`);
      setTimeout(() => resolve({ 
        data: { 
          success: true, 
          token: 'fake-jwt-token' 
        } 
      }), 1000);
    }),

  checkSession: () => 
    new Promise((resolve) => {
      setTimeout(() => resolve({ data: { isValid: true } }), 500);
    }),
};