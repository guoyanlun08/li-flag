import api from '@/utils/httpRequest';

import { CreateTeamFlagReqData } from '@/features/teamFlag/type';

/**
 * 获取团队Flag信息 接口
 * @returns
 */
export async function getTeamFlagInfoByUser() {
  const resp = await api.get('/teamFlag/getTeamFlagInfoByUser');

  if (resp?.code) {
    console.error('getTeamFlagInfoByUser 获取失败');
  }

  return resp.data?.teamFlagInfo || [];
}

/**
 * 新增teamflag 接口
 * @param data 新增team flag 参数
 * @returns
 */
export async function createTeamFlag(data: CreateTeamFlagReqData) {
  const resp = await api.post<CreateTeamFlagReqData>('/teamFlag/createTeamFlag', data);

  if (resp?.code) {
    console.error('createTeamFlag error');
  }

  return resp;
}

/**
 * 删除teamflag 接口
 * @param data 删除team flag 参数
 * @returns
 */
export async function deleteTeamFlag(data: { teamFlagId: number }) {
  const resp = await api.delete<{ teamFlagId: number }>('/teamFlag/deleteTeamFlag', data);

  if (resp?.code) {
    console.error('deleteTeamFlag error');
  }

  return resp;
}

/**
 * 通过 teanFlagId 获取团队 Flag 所有详情（关联 user, todo 表）
 * @returns
 */
export async function getTeamFlagAllInfoById(data: { teamFlagId: number }) {
  const resp = await api.get('/teamFlag/getTeamFlagAllInfoById', data);

  if (resp?.code) {
    throw new Error('getTeamFlagAllInfoById 获取失败');
  }

  return resp.data?.teamFlagInfo || {};
}

/**
 * 通过 teanFlagId 获取团队 Flag 详情（无关联）
 * @returns
 */
export async function getTeamFlagInfoById(data: { teamFlagId: number }) {
  const resp = await api.get('/teamFlag/getTeamFlagInfoById', data);

  if (resp?.code) {
    throw new Error('getTeamFlagInfoById 获取失败');
  }

  return resp.data?.teamFlagInfo || {};
}
