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

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
}

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

    if (response.status === 401) {
      tokenStorage.clearAll();
    }

    let jsonResult: BaseAPIResponse<T> | null = null;
    const text = await response.text();
    if (text) {
      try {
        jsonResult = JSON.parse(text);
      } catch {
        jsonResult = null;
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
