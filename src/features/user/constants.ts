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
