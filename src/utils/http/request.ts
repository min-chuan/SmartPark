import http from './http';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export function get(url: string, params?: any): Promise<ApiResponse> {
  return http.get(url, { params });
}

export function post(url: string, data?: any): Promise<ApiResponse> {
  return http.post(url, data);
}
