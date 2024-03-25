import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserStateType } from './type';
import { initialState } from './dataAndMethods';

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

// user: 异步动作
export { getUserInfoThunk, updateUserInfoThunk } from './dataAndMethods';

export default userSlice.reducer;
