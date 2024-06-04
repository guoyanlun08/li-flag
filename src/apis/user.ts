import api from '@/utils/httpRequest';

import { UserStateType } from '@/features/user/type';

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
  const resp = await api.put<UserStateType & { password?: string; repeatPassword?: string }>('/user/updateUserInfo', data);

  if (resp?.code) {
    console.error('updateUserInfo 更新有误');
  }

  return resp.data;
}
