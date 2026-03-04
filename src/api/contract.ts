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

export interface BillData {
  accountNo: string;
  status: string;
  roomNo: string;
  carNo: string;
  tel: string;
  costName1: string;
  costName2: string;
  costName3: string;
  startDate: string;
  endDate: string;
  preferential: number;
  money: number;
  pay: string;
}

export interface GetBillListRequest {
  page: number;
  pageSize: number;
  no: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface GetBillListResponse {
  list: BillData[];
  total: number;
}

export function getBillList(data: GetBillListRequest): Promise<ApiResponse<GetBillListResponse>> {
  return post('/getBillList', data);
}
