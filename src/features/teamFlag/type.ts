export interface TeamFlagItem {
  teamFlagId: number;
  teamFlagTitle: string;
  teamFlagDesc: string;
  teamDeadline: string;
  teamFlagIcon: string;
  teamMembers: string;
}
export interface CardHeaderProps {
  id: number;
  title: string;
  description: string;
  deadline: string;
  groupIcon: string;
}
export interface TeamFlagCardProps {
  teamFlagsData: TeamFlagItem[];
}
export interface CardFooterProps {
  finished: number;
  total: number;
  memberAvatar: string[];
}

/**
 * 创建团队 Flag 请求数据类型
 */
export type CreateTeamFlagReqData = {
  teamFlagTitle: string;
  teamLeader?: string;
  teamMembers?: string;
  teamFlagDesc?: string;
  teamFlagIcon?: string;
  teamDeadline?: Date;
};
