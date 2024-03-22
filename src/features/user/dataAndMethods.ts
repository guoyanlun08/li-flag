import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '@/utils/httpRequest';
import { setUserInfo } from './userSlice';

import { UserStateType } from './type';

export const initialState: UserStateType = {
  userId: 'FlagUser',
  nickName: 'FlagUser',
  updateTime: Date.now(),
  lastOnlineTime: Date.now(),
  createTime: Date.now(),
  avatarPath: ''
};

// 异步：获取设置用户信息
export const getUserInfoThunk = createAsyncThunk<any>('user/getUserInfo', async (payload, { dispatch }) => {
  try {
    const {
      data: { userInfo }
    } = await api.get('/user/getUserInfo');
    dispatch(setUserInfo({ userInfo }));
  } catch (e) {
    console.error(`获取失败:: getUserInfoThunk :: ${e}`);
  }
});
