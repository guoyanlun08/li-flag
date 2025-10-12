import { Button } from 'antd';
import React, { memo } from 'react';

import { apiAddTeamFlagTodoItem } from '@/apis/todoItem';
import { TeamFlagInfo } from '@/apis/teamFlag.type';

type PropsType = {
  /** 团队模块 Id */
  teamFlagId: number;
  /** 刷新 todo 列表 */
  refreshTeamTodoList: () => Promise<void>;
  /** 是否锁定 */
  isLock: boolean;
  /** 刷新 teamFlag 信息 */
  refreshTeamFlagInfo: () => Promise<TeamFlagInfo>;
  /** 锁定团队Flag的回调函数 */
  onLockTeamFlag: () => Promise<void>;
};

/** 团队 flag 新增 todo 按钮 */
const AddTodoBtn = memo((props: PropsType) => {
  const { teamFlagId, refreshTeamTodoList, isLock, onLockTeamFlag } = props;

  /**
   *  点击新增
   */
  const handleClick = async () => {
    if (isLock) {
      return;
    }
    const resp = await apiAddTeamFlagTodoItem({ teamFlagId });
    if (resp.hadAdd) {
      await Promise.all([refreshTeamTodoList(), onLockTeamFlag()]);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick} disabled={isLock}>
        新增 todo
      </Button>
    </div>
  );
});

export default AddTodoBtn;
