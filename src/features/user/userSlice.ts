import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserStateType } from './type';

const initialState: UserStateType = {
  userId: 'FlagUser',
  nickName: 'FlagUser',
  updateTime: new Date(),
  lastOnlineTime: new Date(),
  createTime: new Date(),
  avatarPath: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 设置 userState 的值
    setUserInfo: (state, action: PayloadAction<{ userInfo: UserStateType }>) => {
      const { userInfo } = action.payload;

      state = userInfo;
    }
  }
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
