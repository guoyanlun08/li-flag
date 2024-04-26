import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserStateType } from './type';
import { initialState } from './constants';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置 userState 的值
    setUserInfo: (state, action: PayloadAction<{ userInfo: UserStateType }>) => {
      const { userInfo } = action.payload;

      return { ...state, ...userInfo };
    }
  }
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
