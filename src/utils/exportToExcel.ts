import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export default function exportToExcel(data: any, header: string[]) {
  // 创建工作簿
  const wb = XLSX.utils.book_new();
  // 创建工作表
  const ws = XLSX.utils.json_to_sheet(data, {
    header,
  });
  // 将工作表插入工作簿
  XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
  // 将数据转为二进制
  const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  // 保存和下载
  saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'selected-data.xlsx');
}
