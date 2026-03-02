import { post, type ApiResponse } from '../utils/http/request';

export interface ContractData {
  contractNo: string;
  type: string;
  name: string;
  startDate: string;
  endDate: string;
  jia: string;
  yi: string;
  status: string;
}

export interface GetContractListRequest {
  page: number;
  pageSize: number;
  contractNo: string;
  person: string;
  tel: string;
}

export interface GetContractListResponse {
  list: ContractData[];
  total: number;
}

export function getContractList(
  data: GetContractListRequest
): Promise<ApiResponse<GetContractListResponse>> {
  return post('/getContractList', data);
}
