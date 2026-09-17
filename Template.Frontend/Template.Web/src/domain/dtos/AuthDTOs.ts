import type { User } from '../entities/User';

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user: User;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
  accessToken?: string;
}

export interface RefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequestDTO {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface RegisterResponseDTO {
  userId: string;
  email: string;
  isVerificationRequired: boolean;
}

export interface SendOtpRequestDTO {
  email: string;
  purpose?: 'Verification' | 'PasswordReset';
}

export interface SendOtpResponseDTO {
  sentTo: string;
  expiresInMinutes: number;
}

export interface VerifyOtpRequestDTO {
  email: string;
  otpCode: string;
}

export interface VerifyOtpResponseDTO {
  isVerified: boolean;
  token?: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ForgotPasswordResponseDTO {
  sentTo: string;
  message: string;
}

export interface ResetPasswordRequestDTO {
  email: string;
  otpCode: string;
  newPassword: string;
}

export interface ResetPasswordResponseDTO {
  isSuccess: boolean;
}

export interface GetMeResponseDTO {
  user: User;
}
