import { useState } from 'react';

export type AuthScreen = 'login' | 'register' | 'verify-otp';

export function useApp() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [unverifiedEmail, setUnverifiedEmail] = useState<string>('');

  const handleNavigateToRegister = () => {
    setAuthScreen('register');
  };

  const handleNavigateToLogin = () => {
    setAuthScreen('login');
  };

  const handleNavigateToVerifyOtp = (email: string) => {
    setUnverifiedEmail(email);
    setAuthScreen('verify-otp');
  };

  return {
    activeTab,
    setActiveTab,
    authScreen,
    unverifiedEmail,
    handleNavigateToRegister,
    handleNavigateToLogin,
    handleNavigateToVerifyOtp,
  };
}
