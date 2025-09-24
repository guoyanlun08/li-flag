import { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { message } from 'antd';
import dayjs from 'dayjs';

import { apiGetTeamFlagAllInfoById, apiGetTeamFlagInfoById, apiUpdateTeamFlagInfo } from '@/apis/teamFlag';
import { updateTodoOrder, apiGetTodoItemsForTeamFlags } from '@/apis/todoItem';
import { usePolling } from '@/hooks';
import { TeamFlagFilter, TeamFlagOperation, TeamTodoTable, AddTodoBtn } from './components';
import { TEAM_FLAG_INFO_POLLING_TIME } from './constants';
import { Styled_TeamFlagDetail } from './Styles';
import { TodoListItemType } from '@/types/todoType';
import { useAppSelector } from '@/app/hooks';
import { TeamFlagInfo } from '@/apis/teamFlag.type';
import { LockStatus } from './constants';

/** 获取 teamFlag 对应的 todoList */
async function getTeamFlagTodoList(teamFlagId: number) {
  const todoListForTeamFlags = await apiGetTodoItemsForTeamFlags({ teamFlagids: teamFlagId });
  const todoList = todoListForTeamFlags?.[teamFlagId]?.todoList || [];

  return todoList;
}

/** 当前在锁定中且锁定超时，自动解锁 */
function isAutoUnlockTeamFlag(teamFlagInfo: TeamFlagInfo) {
  const { locker, lockTime } = teamFlagInfo;
  if (locker && lockTime && dayjs(lockTime).isBefore(dayjs().subtract(5, 'minute'))) {
    return true;
  }
  return false;
}

function TeamFlagDeatail() {
  const [messageApi, contextHolder] = message.useMessage();
  const routeParams = useParams();
  const teamFlagId = Number(routeParams.teamFlagId);
  const userState = useAppSelector((store) => store.user);
  const { userId } = userState;

  const [teamFlagInfo, setTeamFlagInfo] = useState<TeamFlagInfo | {}>({});
  const [teamTodoList, setTeamTodoList] = useState<TodoListItemType[]>([]);

  // 锁定状态判断
  const lockStatus = useMemo(() => {
    const { locker = '' } = teamFlagInfo as TeamFlagInfo;
    if (!locker) {
      return LockStatus.Unlocked;
    } else if (locker === userId) {
      return LockStatus.SelfLocked;
    } else {
      return LockStatus.OtherLocked;
    }
  }, [teamFlagInfo, userId]);

  // 获取更新 teamFlag 信息
  const fetchAndUpdateTeamFlagInfo = useCallback(async () => {
    const teamFlagInfo = await apiGetTeamFlagInfoById({ teamFlagId });
    // 自动解锁
    if (isAutoUnlockTeamFlag(teamFlagInfo)) {
      await apiUpdateTeamFlagInfo({ teamFlagId, locker: '' });
      teamFlagInfo.locker = '';
      teamFlagInfo.lockTime = null;
      messageApi.warning('已自动解锁');
    }
    setTeamFlagInfo(teamFlagInfo); // 更新状态
    return teamFlagInfo; // 返回数据供轮询使用
  }, [teamFlagId, messageApi]);
  // 轮询
  usePolling(fetchAndUpdateTeamFlagInfo, TEAM_FLAG_INFO_POLLING_TIME);

  useEffect(() => {
    // 获取 teamFlag 所有信息
    const fetchTeamFlagAllInfo = async () => {
      try {
        const { todoList, ...teamFlagInfo } = await apiGetTeamFlagAllInfoById({ teamFlagId });

        setTeamFlagInfo(teamFlagInfo);
        setTeamTodoList(todoList || []);
      } catch (error) {
        console.error('[TeamFlagDetail] 获取团队Flag信息失败:', error);
      }
    };

    fetchTeamFlagAllInfo();
  }, [teamFlagId]);

  /** 拖拽后更新 todoList 数据 */
  const dragChangeTeamTodoList = useCallback(async (newVal: TodoListItemType[], oldVal: TodoListItemType[]) => {
    setTeamTodoList(newVal);
    const { updated } = await updateTodoOrder({ todoList: newVal });
    if (!updated) {
      setTeamTodoList(oldVal);
    }
  }, []);

  /** 刷新 todoList 数据 */
  const refreshTeamTodoList = useCallback(async () => {
    const todoList = await getTeamFlagTodoList(teamFlagId);
    setTeamTodoList(todoList);
  }, [teamFlagId]);

  /** 未锁定状态下，执行操作自动锁定 teamFlag */
  const autoLockTeamFlag = useCallback(async () => {
    if (lockStatus === LockStatus.Unlocked) {
      const { updateTeamFlagId } = await apiUpdateTeamFlagInfo({ teamFlagId, locker: userId });
      if (updateTeamFlagId) {
        await fetchAndUpdateTeamFlagInfo();
        messageApi.warning('已锁定');
      }
    }
  }, [lockStatus, teamFlagId, userId, fetchAndUpdateTeamFlagInfo, messageApi]);

  return (
    <>
      {contextHolder}
      <Styled_TeamFlagDetail>
        <TeamFlagOperation
          teamFlagId={teamFlagId}
          lockStatus={lockStatus}
          userId={userId}
          refreshTeamFlagInfo={fetchAndUpdateTeamFlagInfo}
        />
        <div className="page-content">
          <div className="page-content-body">
            <div className="filter-form">
              <AddTodoBtn
                teamFlagId={teamFlagId}
                refreshTeamTodoList={refreshTeamTodoList}
                isLock={lockStatus === LockStatus.OtherLocked}
                refreshTeamFlagInfo={fetchAndUpdateTeamFlagInfo}
                onLockTeamFlag={autoLockTeamFlag}
              />
              <TeamFlagFilter />
            </div>
            <div className="flag-item-table">
              <TeamTodoTable
                isLock={lockStatus === LockStatus.OtherLocked}
                todoList={teamTodoList}
                dragChangeTeamTodoList={dragChangeTeamTodoList}
                refreshTeamTodoList={refreshTeamTodoList}
                onLockTeamFlag={autoLockTeamFlag}
              />
            </div>
          </div>
        </div>
      </Styled_TeamFlagDetail>
    </>
  );
}

export default TeamFlagDeatail;
