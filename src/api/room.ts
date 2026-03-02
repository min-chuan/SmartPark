import { type ApiResponse, post } from '../utils/http/request';

export interface RoomData {
  roomNumber: number;
  decorationType: '毛坯' | '精装';
  area: number;
  unitPrice: number;
  src: string;
}

export function getRoomList(data: { roomId: string }): Promise<ApiResponse<{ rooms: RoomData[] }>> {
  return post('/getRoomList', data);
}
