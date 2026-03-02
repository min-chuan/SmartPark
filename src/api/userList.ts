import type { ApiResponse } from '@/utils/http/request';
import { post } from '@/utils/http/request';

export interface GetUserListRequest {
  page: number;
  pageSize: number;
  company: string;
  contact: string;
  tel: string;
}

export interface UserData {
  id: string;
  name: string;
  status: string;
  tel: string;
  business: string;
  email: string;
  creditCode: string;
  industryNum: string;
  organizationCode: string;
  legalPerson: string;
}

export interface GetUserListResponse {
  list: UserData[];
  total: number;
}

export function getUserList(data: GetUserListRequest): Promise<ApiResponse<GetUserListResponse>> {
  return post('/userList', data);
}

export function deleteUser(data: { id: string }): Promise<ApiResponse> {
  return post('/deleteUser', data);
}

export function batchDeleteUser(data: { ids: string[] }): Promise<ApiResponse> {
  return post('/batchDeleteUser', data);
}

export type EditUserRequest = Omit<UserData, 'id'> & Partial<Pick<UserData, 'id'>>;
export function editUser(data: EditUserRequest): Promise<ApiResponse> {
  return post('/editUser', data);
}
