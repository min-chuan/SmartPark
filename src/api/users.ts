import type { ApiResponse } from '@/utils/http/request';
import { get, post } from '@/utils/http/request';

interface LoginData {
  username: string;
  password: string;
}

// API 返回的菜单项数据结构
export interface MenuItem {
  icon?: string;
  label: string;
  key: string;
  disabled?: boolean;
  children?: MenuItem[];
}

export function login(data: LoginData) {
  return post('/login', data);
}

export function getMenu(): Promise<ApiResponse<MenuItem[]>> {
  return get('/menu');
}
