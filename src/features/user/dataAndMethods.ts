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

// 异步：更新用户信息
export const updateUserInfoThunk = createAsyncThunk<
  any,
  // 这个类型 抽出来
  { userId: string; password?: string; repeatPassword?: string; avatarPath?: string; nickName?: string }
>('user/updateUserInfo', async (payload, { dispatch }) => {
  try {
    const resp = await api.put('/user/updateUserInfo');

    console.log('updateUserInfoThunk==', resp);
  } catch (e) {
    console.error(`获取失败:: updateUserInfoThunk :: ${e}`);
  }
});
