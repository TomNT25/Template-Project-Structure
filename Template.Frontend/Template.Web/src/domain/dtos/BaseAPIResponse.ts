export interface BaseAPIResponse<T> {
  isSuccess: boolean;
  statusCode: number;
  message?: string | null;
  data?: T | null;
  errors: string[];
  timestamp: string;
}
