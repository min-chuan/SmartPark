import { configureStore } from '@reduxjs/toolkit';
import contractReducer from './finance/contractSlice';
import authReducer from './login/authSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contract: contractReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
