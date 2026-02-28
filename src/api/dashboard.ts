import type { ApiResponse } from '@/utils/http/request';
import { get } from '@/utils/http/request';

export interface EnergyDataItem {
  name: string;
  data: number[];
}

export function getEnergyData(): Promise<ApiResponse<EnergyDataItem[]>> {
  return get('/energyData');
}
