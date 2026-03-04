import type { ApiResponse } from '@/utils/http/request';
import { get } from '@/utils/http/request';

export interface EnergyData {
  name: string;
  data: number[];
}

export function getEnergyList(): Promise<ApiResponse<EnergyData[]>> {
  return get('/getEnergyList');
}
