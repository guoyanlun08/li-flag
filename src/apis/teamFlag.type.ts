import { TodoListItemType } from '@/types/todoType';

export type teamFlagInfo = {
  teamFlagId: number;
  teamFlagTitle: string;
  teamFlagDesc: string | null;
  teamFlagIcon: string;
  teamLeader: string;
  teamMembers: string | null;
  isLock: number;
  locker: string;
  lastLockTime: string | null;
  isDone: number;
  teamDeadline: string | null;
  createTime: string;
  updateTime: string;
  todoList?: TodoListItemType[];
};

/** 创建团队 Flag 请求数据类型 */
export type ApiCreateTeamFlagReqData = {
  teamFlagTitle: string;
  teamLeader?: string;
  teamMembers?: string;
  teamFlagDesc?: string;
  teamFlagIcon?: string;
  teamDeadline?: Date;
};

export type ApiGetTeamFlagInfoByUserResp = {
  teamFlagInfo: teamFlagInfo[];
};

/** apiGetTeamFlagAllInfoById 返回类型 */
export type ApiGetTeamFlagAllInfoByIdResp = {
  teamFlagInfo: teamFlagInfo;
};

/** apiGetTeamFlagAllInfoById 请求数据类型 */
export type ApiGetTeamFlagAllInfoByIdReqData = {
  teamFlagId: number;
};

/** apiGetTeamFlagInfoById 返回类型 */
export type ApiGetTeamFlagInfoByIdResp = {
  teamFlagInfo: teamFlagInfo;
};
