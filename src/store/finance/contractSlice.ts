import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ContractData, GetContractListRequest } from '../../api/contract';

export type SearchType = Omit<GetContractListRequest, 'page' | 'pageSize'>;

interface ContractState {
  data: ContractData[];
  total: number;
  page: number;
  pageSize: number;
  formData: SearchType;
}

export const initialFormData: SearchType = {
  contractNo: '',
  person: '',
  tel: '',
};

const initialState: ContractState = {
  data: [],
  total: 0,
  page: 1,
  pageSize: 10,
  formData: initialFormData,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ContractData[]>) => {
      state.data = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setFormData: (state, action: PayloadAction<SearchType>) => {
      state.formData = action.payload;
    },
  },
});

export const { setData, setTotal, setPage, setPageSize, setFormData } = contractSlice.actions;
export default contractSlice.reducer;
