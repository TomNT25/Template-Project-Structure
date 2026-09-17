import type { BaseAPIResponse } from '@domain/dtos/BaseAPIResponse';
import { tokenStorage } from '../storage/tokenStorage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export class ApiError extends Error {
  statusCode: number;
  errors: string[];

  constructor(message: string, statusCode = 400, errors: string[] = []) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

export async function httpRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, params, headers: customHeaders, ...customConfig } = options;

  let url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  const token = tokenStorage.getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(customHeaders as Record<string, string>),
  };

  const config: RequestInit = {
    ...customConfig,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, config);

    let jsonResult: BaseAPIResponse<T> | null = null;
    const text = await response.text();
    if (text) {
      try {
        jsonResult = JSON.parse(text);
      } catch {
        jsonResult = null;
      }
    }

    if (response.status === 401) {
      const isAuthEndpoint =
        endpoint.includes('/auth/login') ||
        endpoint.includes('/auth/refresh-token') ||
        endpoint.includes('/auth/refresh');

      if (isAuthEndpoint) {
        tokenStorage.clearAll();
        window.dispatchEvent(new Event('auth:unauthorized'));
        const message = jsonResult?.message || 'Unauthorized';
        throw new ApiError(message, 401, jsonResult?.errors || []);
      }

      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) {
        tokenStorage.clearAll();
        window.dispatchEvent(new Event('auth:unauthorized'));
        const message = jsonResult?.message || 'Unauthorized - Session expired';
        throw new ApiError(message, 401, jsonResult?.errors || []);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          return httpRequest<T>(endpoint, {
            ...options,
            headers: {
              ...(customHeaders as Record<string, string>),
              Authorization: `Bearer ${newToken}`,
            },
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error('Refresh token request failed');
        }

        const refreshResult = await refreshResponse.json();
        const data = refreshResult?.data || refreshResult;
        const newAccessToken = data?.accessToken || data?.token;
        const newRefreshToken = data?.refreshToken;

        if (!newAccessToken) {
          throw new Error('Invalid refresh token response');
        }

        tokenStorage.setToken(newAccessToken);
        if (newRefreshToken) {
          tokenStorage.setRefreshToken(newRefreshToken);
        }

        processQueue(null, newAccessToken);

        return httpRequest<T>(endpoint, {
          ...options,
          headers: {
            ...(customHeaders as Record<string, string>),
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        tokenStorage.clearAll();
        window.dispatchEvent(new Event('auth:unauthorized'));
        throw new ApiError('Session expired. Please sign in again.', 401);
      } finally {
        isRefreshing = false;
      }
    }

    if (!response.ok) {
      const message = jsonResult?.message || `HTTP Request failed with status ${response.status}`;
      const errors = jsonResult?.errors || [];
      throw new ApiError(message, response.status, errors);
    }

    if (jsonResult && typeof jsonResult === 'object' && 'isSuccess' in jsonResult) {
      if (!jsonResult.isSuccess) {
        throw new ApiError(jsonResult.message || 'Operation failed', jsonResult.statusCode || 400, jsonResult.errors || []);
      }
      return jsonResult.data as T;
    }

    return (jsonResult ?? (text as unknown)) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError((error as Error).message || 'Network error occurred', 500);
  }
}

export const httpClient = {
  get: <T>(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>, options?: RequestOptions) =>
    httpRequest<T>(endpoint, { ...options, method: 'GET', params }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    httpRequest<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    httpRequest<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    httpRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
