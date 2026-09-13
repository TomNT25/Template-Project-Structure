import React from 'react';
import { AuthLayout } from '@presentation/layouts/AuthLayout';
import { Input, Button } from '@presentation/components';
import { useVerifyOtpPage, type UseVerifyOtpPageProps } from './useVerifyOtpPage';
import './VerifyOtpPage.css';

export interface VerifyOtpPageProps extends UseVerifyOtpPageProps {}

export const VerifyOtpPage: React.FC<VerifyOtpPageProps> = (props) => {
  const {
    email,
    setEmail,
    otpCode,
    setOtpCode,
    isLoading,
    isResending,
    handleSubmit,
    handleResendOtp,
    handleLoginClick,
  } = useVerifyOtpPage(props);

  return (
    <AuthLayout
      title="Verify Email OTP"
      subtitle={`Enter the 6-digit code sent to ${email || 'your email'}`}
    >
      <form onSubmit={handleSubmit} className="verify-otp-form">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="6-Digit OTP Code"
          placeholder="123456"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          maxLength={6}
          helperText="Demo code: 123456"
          required
        />

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Verify OTP Code
        </Button>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          isLoading={isResending}
          onClick={handleResendOtp}
        >
          Resend Code
        </Button>
      </form>

      <div className="auth-switch-prompt">
        Back to{' '}
        <span className="auth-switch-link" onClick={handleLoginClick}>
          Sign In
        </span>
      </div>
    </AuthLayout>
  );
};
