import { TodoListItemType } from '@/types/todoType';
import { Dayjs } from 'dayjs';

export type TeamFlagInfo = {
  teamFlagId: number;
  teamFlagTitle: string;
  teamFlagDesc: string | null;
  teamFlagIcon: string;
  teamLeader: string;
  teamMembers: string | null;
  locker: string | null;
  lockTime: string | null;
  isDone: number;
  teamDeadline: number | null | Dayjs;
  createTime: string;
  updateTime: string;
  todoList?: TodoListItemType[];
  completedCount: number;
  todoItemCount: number;
};

/** 创建团队 Flag 请求数据类型 */
export type ApiCreateTeamFlagReqData = {
  teamFlagTitle: string;
  teamLeader?: string;
  teamMembers?: string | null;
  teamFlagDesc?: string;
  teamFlagIcon?: string;
  teamDeadline?: number | null;
};

export type ApiGetTeamFlagInfoByUserResp = {
  teamFlagInfo: TeamFlagInfo[];
};

/** apiGetTeamFlagAllInfoById 返回类型 */
export type ApiGetTeamFlagAllInfoByIdResp = {
  teamFlagInfo: TeamFlagInfo;
};

/** apiGetTeamFlagAllInfoById 请求数据类型 */
export type ApiGetTeamFlagAllInfoByIdReqData = {
  teamFlagId: number;
};

/** apiGetTeamFlagInfoById 返回类型 */
export type ApiGetTeamFlagInfoByIdResp = {
  teamFlagInfo: TeamFlagInfo;
};

/** apiUpdateTeamFlagInfo 请求数据类型 */
export type ApiUpdateTeamFlagInfoReqData = {
  teamFlagId: number;
} & Partial<TeamFlagInfo>;

/** apiUpdateTeamFlagInfo 返回类型 */
export type ApiUpdateTeamFlagInfoResp = {
  updateTeamFlagId: number;
};
