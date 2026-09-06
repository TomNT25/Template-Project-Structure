import React, { useState } from 'react';
import { useAuth } from '@application/context/AuthContext';
import { authApi } from '@infrastructure/api/authApi';
import { useToast } from '@application/context/ToastContext';

export interface UseVerifyOtpPageProps {
  initialEmail?: string;
  onSuccess?: () => void;
  onNavigateToLogin?: () => void;
}

export function useVerifyOtpPage({
  initialEmail = '',
  onSuccess,
  onNavigateToLogin,
}: UseVerifyOtpPageProps) {
  const { verifyOtp, isLoading } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState<string>(initialEmail || 'user@example.com');
  const [otpCode, setOtpCode] = useState<string>('123456');
  const [isResending, setIsResending] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otpCode) {
      showToast('error', 'Validation Error', 'Please enter email and OTP code');
      return;
    }

    try {
      const isVerified = await verifyOtp({ email, otpCode });
      if (isVerified && onSuccess) {
        onSuccess();
      }
    } catch {
      // Toast handles error
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await authApi.sendOtp({ email, purpose: 'Verification' });
      showToast('info', 'OTP Resent', `A new verification code was sent to ${email}`);
    } catch (err: unknown) {
      showToast('error', 'Resend Failed', (err as Error).message || 'Could not resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return {
    email,
    setEmail,
    otpCode,
    setOtpCode,
    isLoading,
    isResending,
    handleSubmit,
    handleResendOtp,
    onNavigateToLogin,
  };
}
