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

// 异步：更新用户信息 (未处理密码部分)
export const updateUserInfoThunk = createAsyncThunk<any, UserStateType & { password?: string; repeatPassword?: string }>(
  'user/updateUserInfo',
  async (payload, { dispatch }) => {
    try {
      const resp = await api.put('/user/updateUserInfo', payload);

      if (resp?.code) {
        throw new Error('更新有误');
      }

      dispatch(setUserInfo({ userInfo: payload }));
    } catch (e) {
      console.error(`更新失败:: updateUserInfoThunk :: ${e}`);
    }
  }
);
