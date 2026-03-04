import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { MenuItem } from '../../api/users';

export interface AuthState {
  token: string;
  menuList: MenuItem[];
}

const initialState: AuthState = {
  token: sessionStorage.getItem('token') || '',
  menuList: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      sessionStorage.setItem('token', action.payload);
    },
    clearToken: state => {
      state.token = '';
      sessionStorage.removeItem('token');
    },
    setMenuList: (state, action: PayloadAction<MenuItem[]>) => {
      state.menuList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, clearToken, setMenuList } = authSlice.actions;

export default authSlice.reducer;
