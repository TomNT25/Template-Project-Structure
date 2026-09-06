import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  User,
  LoginRequestDTO,
  RegisterRequestDTO,
  VerifyOtpRequestDTO,
} from '@domain/index';
import { authApi } from '@infrastructure/api/authApi';
import { tokenStorage } from '@infrastructure/storage/tokenStorage';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (request: LoginRequestDTO) => Promise<void>;
  register: (request: RegisterRequestDTO) => Promise<boolean>;
  verifyOtp: (request: VerifyOtpRequestDTO) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => tokenStorage.getUser<User>());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useToast();

  const initAuth = useCallback(async () => {
    const token = tokenStorage.getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const meResponse = await authApi.getMe();
      if (meResponse?.user) {
        setUser(meResponse.user);
        tokenStorage.setUser(meResponse.user);
      }
    } catch {
      // Token expired or invalid
      tokenStorage.clearAll();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (request: LoginRequestDTO): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authApi.login(request);
      tokenStorage.setToken(response.token);
      tokenStorage.setUser(response.user);
      setUser(response.user);
      showToast('success', 'Welcome back!', `Logged in as ${response.user.fullName}`);
    } catch (err: unknown) {
      const message = (err as Error).message || 'Login failed';
      showToast('error', 'Login Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (request: RegisterRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authApi.register(request);
      showToast('success', 'Registration Successful', 'Please check your email for OTP verification.');
      return response.isVerificationRequired;
    } catch (err: unknown) {
      const message = (err as Error).message || 'Registration failed';
      showToast('error', 'Registration Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (request: VerifyOtpRequestDTO): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authApi.verifyOtp(request);
      if (response.token) {
        tokenStorage.setToken(response.token);
      }
      showToast('success', 'Verified', 'Email address verified successfully!');
      return response.isVerified;
    } catch (err: unknown) {
      const message = (err as Error).message || 'OTP verification failed';
      showToast('error', 'Verification Failed', message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Optional backend logout endpoint call
    } catch {
      // Ignore
    } finally {
      tokenStorage.clearAll();
      setUser(null);
      setIsLoading(false);
      showToast('info', 'Logged Out', 'You have been logged out successfully.');
    }
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      const meResponse = await authApi.getMe();
      if (meResponse?.user) {
        setUser(meResponse.user);
        tokenStorage.setUser(meResponse.user);
      }
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyOtp,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
