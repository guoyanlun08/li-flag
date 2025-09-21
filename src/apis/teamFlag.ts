import api from '@/utils/httpRequest';

import {
  ApiGetTeamFlagAllInfoByIdResp,
  ApiGetTeamFlagInfoByIdResp,
  ApiGetTeamFlagInfoByUserResp,
  ApiCreateTeamFlagReqData
} from '@/apis/teamFlag.type';

/**
 * 获取团队Flag信息 接口
 * @returns
 */
export async function apiGetTeamFlagInfoByUser() {
  const resp = await api.get<{}, ApiGetTeamFlagInfoByUserResp>('/teamFlag/getTeamFlagInfoByUser');

  if (resp?.code) {
    console.error('apiGetTeamFlagInfoByUser 获取失败');
  }

  return resp.data?.teamFlagInfo || [];
}

/**
 * 新增teamflag 接口
 * @param data 新增team flag 参数
 * @returns
 */
export async function apiCreateTeamFlag(data: ApiCreateTeamFlagReqData) {
  const resp = await api.post<ApiCreateTeamFlagReqData, { createTeamFlagId: number }>('/teamFlag/createTeamFlag', data);

  if (resp?.code) {
    console.error('apiCreateTeamFlag error');
  }

  return resp;
}

/**
 * 删除teamflag 接口
 * @param data 删除team flag 参数
 * @returns
 */
export async function apiDeleteTeamFlag(data: { teamFlagId: number }) {
  const resp = await api.delete<{ teamFlagId: number }, null>('/teamFlag/deleteTeamFlag', data);

  if (resp?.code) {
    console.error('apiDeleteTeamFlag error');
  }

  return resp;
}

/**
 * 通过 teanFlagId 获取团队 Flag 所有详情（关联 user, todo 表）
 * @returns
 */
export async function apiGetTeamFlagAllInfoById(data: { teamFlagId: number }) {
  const resp = await api.get<{ teamFlagId: number }, ApiGetTeamFlagAllInfoByIdResp>('/teamFlag/getTeamFlagAllInfoById', data);

  if (resp?.code) {
    throw new Error('getTeamFlagAllInfoById 获取失败');
  }

  return resp.data?.teamFlagInfo || {};
}

/**
 * 通过 teanFlagId 获取团队 Flag 详情（无关联）
 * @returns
 */
export async function apiGetTeamFlagInfoById(data: { teamFlagId: number }) {
  const resp = await api.get<{ teamFlagId: number }, ApiGetTeamFlagInfoByIdResp>('/teamFlag/getTeamFlagInfoById', data);

  if (resp?.code) {
    throw new Error('getTeamFlagInfoById 获取失败');
  }

  return resp.data?.teamFlagInfo || {};
}
