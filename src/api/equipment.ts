import { post, type ApiResponse } from '../utils/http/request';

export interface EquipmentData {
  id: number;
  no: string;
  name: string;
  person: string;
  tel: number;
  time: string;
  rest: string;
  status: string;
  last: string;
  type: string;
  from: string;
}

export interface GetEquipmentListRequest {
  page: number;
  pageSize: number;
  name: string;
  person: string;
}

export interface GetEquipmentListResponse {
  list: EquipmentData[];
  total: number;
}

export function getEquipmentList(
  data: GetEquipmentListRequest
): Promise<ApiResponse<GetEquipmentListResponse>> {
  return post('/getEquipmentList', data);
}
