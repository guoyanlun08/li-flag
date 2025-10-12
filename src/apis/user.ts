import api from '@/utils/httpRequest';

import { UserStateType } from '@/features/user/type';
import { SearchUsersResp } from '@/apis/user.type';

/**
 * 获取用户信息 接口
 * @returns
 */
export async function getUserInfo() {
  const resp = await api.get('/user/getUserInfo');

  if (resp?.code) {
    console.error('getUserInfo 获取失败');
  }

  return resp.data;
}

/**
 * 更新用户信息 接口
 * @param data 更新用户接口 参数
 * @returns
 */
export async function updateUserInfo(data: UserStateType & { password?: string; repeatPassword?: string }) {
  const resp = await api.put<UserStateType & { password?: string; repeatPassword?: string }, { userId: string; hadUpdated: boolean }>(
    '/user/updateUserInfo',
    data
  );

  if (resp?.code) {
    console.error('updateUserInfo 更新有误');
  }

  return resp.data;
}

/**
 * 搜索用户
 * @param data
 * @returns
 */
export async function searchUsers(data: { userId: string }) {
  const resp = await api.get<{ userId: string }, SearchUsersResp[]>('/user/searchUsers', data);

  if (resp?.code) {
    console.error('searchUsers 搜索用户有误');
  }

  return resp.data;
}
