import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserData } from '../../api/userList';

interface UserState {
  userData?: UserData;
}

const initialState: UserState = {
  userData: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    clearUserData: state => {
      state.userData = undefined;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
