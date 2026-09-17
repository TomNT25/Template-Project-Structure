import type {
  LoginRequestDTO,
  LoginResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  SendOtpRequestDTO,
  SendOtpResponseDTO,
  VerifyOtpRequestDTO,
  VerifyOtpResponseDTO,
  ForgotPasswordRequestDTO,
  ForgotPasswordResponseDTO,
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO,
  GetMeResponseDTO,
} from '@domain/index';
import { httpClient } from '../http/httpClient';
import { mockAuthService } from '../mocks/mockAdapters';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const authApi = {
  login: async (request: LoginRequestDTO): Promise<LoginResponseDTO> => {
    if (USE_MOCK) return mockAuthService.login(request);
    return httpClient.post<LoginResponseDTO>('/auth/login', request);
  },

  refreshToken: async (request: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> => {
    return httpClient.post<RefreshTokenResponseDTO>('/auth/refresh-token', request);
  },

  register: async (request: RegisterRequestDTO): Promise<RegisterResponseDTO> => {
    if (USE_MOCK) return mockAuthService.register(request);
    return httpClient.post<RegisterResponseDTO>('/auth/register', request);
  },

  sendOtp: async (request: SendOtpRequestDTO): Promise<SendOtpResponseDTO> => {
    if (USE_MOCK) return mockAuthService.sendOtp(request);
    return httpClient.post<SendOtpResponseDTO>('/auth/send-otp', request);
  },

  verifyOtp: async (request: VerifyOtpRequestDTO): Promise<VerifyOtpResponseDTO> => {
    if (USE_MOCK) return mockAuthService.verifyOtp(request);
    return httpClient.post<VerifyOtpResponseDTO>('/auth/verify-otp', request);
  },

  forgotPassword: async (request: ForgotPasswordRequestDTO): Promise<ForgotPasswordResponseDTO> => {
    if (USE_MOCK) return mockAuthService.forgotPassword(request);
    return httpClient.post<ForgotPasswordResponseDTO>('/auth/forgot-password', request);
  },

  resetPassword: async (request: ResetPasswordRequestDTO): Promise<ResetPasswordResponseDTO> => {
    if (USE_MOCK) return mockAuthService.resetPassword(request);
    return httpClient.post<ResetPasswordResponseDTO>('/auth/reset-password', request);
  },

  getMe: async (): Promise<GetMeResponseDTO> => {
    if (USE_MOCK) return mockAuthService.getMe();
    return httpClient.get<GetMeResponseDTO>('/auth/me');
  },
};
