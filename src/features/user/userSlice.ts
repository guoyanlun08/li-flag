import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserStateType } from './type';
import { initialState } from './constants';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** 设置 userState 的值 */
    setUserInfo: (state, action: PayloadAction<{ userInfo: UserStateType }>) => {
      const { userInfo } = action.payload;

      return { ...state, ...userInfo };
    },

    /** 清空 User 信息 —— 登出操作 */
    initUserInfo: (state, action: PayloadAction) => {
      state = initialState
    },
  }
});

export const { setUserInfo, initUserInfo } = userSlice.actions;

export default userSlice.reducer;
