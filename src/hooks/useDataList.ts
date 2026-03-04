import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApiResponse } from '../utils/http/request';

interface DataFetcher<T, U> {
  (
    args: { page: number; pageSize: number } & T
  ): Promise<ApiResponse<{ list: U[]; total: number }>>;
}
function useDataList<T extends Record<string, any>, U>(
  initialFormData: T,
  fetchData: DataFetcher<T, U>
) {
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<T>(initialFormData);
  const [dataList, setDataList] = useState<U[]>([]);

  // 使用 ref 存储最新的 formData，避免闭包问题
  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const loadData = useCallback(
    async (currentPage?: number, currentPageSize?: number, currentFormData?: T) => {
      try {
        setLoading(true);
        const res = await fetchData({
          page: currentPage ?? page,
          pageSize: currentPageSize ?? pageSize,
          ...(currentFormData ?? formDataRef.current),
        });
        if (res.data) {
          const { list, total } = res.data;
          setDataList(list);
          setTotal(total);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize, fetchData] // 移除了 formData 依赖
  );

  // 暂时只能处理Input表单
  const handleFormItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePageConfigChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    loadData(page, pageSize);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPage(1);
    setPageSize(10);
    loadData(1, 10, initialFormData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    total,
    setTotal,
    page,
    setPage,
    pageSize,
    setPageSize,
    loading,
    setLoading,
    formData,
    setFormData,
    dataList,
    setDataList,
    loadData,
    handleFormItemChange,
    handlePageConfigChange,
    handleReset,
  };
}

export default useDataList;
