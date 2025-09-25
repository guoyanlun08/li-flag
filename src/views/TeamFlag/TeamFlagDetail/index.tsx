import { useCallback, useEffect, useState, useMemo, useContext } from 'react';
import { useParams } from 'react-router';
import { message } from 'antd';
import dayjs from 'dayjs';

import { apiGetTeamFlagAllInfoById, apiGetTeamFlagInfoById, apiUpdateTeamFlagInfo } from '@/apis/teamFlag';
import { updateTodoOrder, apiGetTodoItemsForTeamFlags } from '@/apis/todoItem';
import { usePolling } from '@/hooks';
import { ItemContextMenu } from '@/components/ContextMenu';
import { TeamFlagFilter, TeamFlagOperation, TeamTodoTable, AddTodoBtn } from './components';
import { Styled_TeamFlagDetail } from './Styles';
import { TodoListItemType } from '@/types/todoType';
import { useAppSelector, AuthContext } from '@/app/hooks';
import { TeamFlagInfo } from '@/apis/teamFlag.type';
import { LockStatus, LOCK_TIMEOUT_MINUTES, TEAM_FLAG_INFO_POLLING_TIME } from './constants';

/** 获取 teamFlag 对应的 todoList */
async function getTeamFlagTodoList(teamFlagId: number) {
  const todoListForTeamFlags = await apiGetTodoItemsForTeamFlags({ teamFlagids: teamFlagId });
  const todoList = todoListForTeamFlags?.[teamFlagId]?.todoList || [];

  return todoList;
}

/** 当前在锁定中且锁定超时，自动解锁 */
async function autoUnlockTeamFlag(teamFlagInfo: TeamFlagInfo, messageApi: any) {
  const updatedTeamFlagInfo = { ...teamFlagInfo };
  const { teamFlagId, locker, lockTime } = updatedTeamFlagInfo;
  if (locker && lockTime && dayjs(lockTime).isBefore(dayjs().subtract(LOCK_TIMEOUT_MINUTES, 'minute'))) {
    await apiUpdateTeamFlagInfo({ teamFlagId, locker: '' });
    updatedTeamFlagInfo.locker = '';
    updatedTeamFlagInfo.lockTime = null;
    messageApi.warning('已自动解锁');
  }
  return updatedTeamFlagInfo;
}

/** 是否是他人锁定 teamFlag */
function isOtherLocked(locker: string | null, userId: string) {
  return locker && locker !== userId;
}

function TeamFlagDeatail() {
  const [messageApi, contextHolder] = message.useMessage();
  const routeParams = useParams();
  const { isLogin } = useContext(AuthContext);
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
    let teamFlagInfo = await apiGetTeamFlagInfoById({ teamFlagId });
    // 超时自动解锁
    teamFlagInfo = await autoUnlockTeamFlag(teamFlagInfo, messageApi);
    setTeamFlagInfo(teamFlagInfo); // 更新状态
    return teamFlagInfo; // 返回数据供轮询使用
  }, [teamFlagId, messageApi]);
  // 轮询，延迟执行
  usePolling(fetchAndUpdateTeamFlagInfo, TEAM_FLAG_INFO_POLLING_TIME, false);

  /** 登录后，获取 teamFlag 所有信息 */
  useEffect(() => {
    if (!isLogin) {
      return;
    }
    // 获取 teamFlag 所有信息
    const fetchTeamFlagAllInfo = async () => {
      try {
        let { todoList, ...teamFlagInfo } = await apiGetTeamFlagAllInfoById({ teamFlagId });
        // 超时自动解锁
        teamFlagInfo = await autoUnlockTeamFlag(teamFlagInfo, messageApi);
        const isOtherLock = isOtherLocked(teamFlagInfo.locker, userId);
        if (isOtherLock) {
          messageApi.warning(`已被 ${teamFlagInfo.locker} 锁定`);
        }

        setTeamFlagInfo(teamFlagInfo);
        setTeamTodoList(todoList || []);
      } catch (error) {
        console.error('[TeamFlagDetail] 获取团队Flag信息失败:', error);
      }
    };

    fetchTeamFlagAllInfo();
  }, [teamFlagId, messageApi, userId, isLogin]);

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
    const { updateTeamFlagId } = await apiUpdateTeamFlagInfo({ teamFlagId, locker: userId });
    if (updateTeamFlagId) {
      await fetchAndUpdateTeamFlagInfo();
      lockStatus === LockStatus.Unlocked && messageApi.warning('已锁定');
    }
  }, [lockStatus, teamFlagId, userId, fetchAndUpdateTeamFlagInfo, messageApi]);

  const refreshAndLockAfterDelete = useCallback(async () => {
    await Promise.all([refreshTeamTodoList(), autoLockTeamFlag()]);
  }, [autoLockTeamFlag, refreshTeamTodoList]);

  return (
    <>
      {contextHolder}
      <Styled_TeamFlagDetail>
        <TeamFlagOperation
          teamFlagId={teamFlagId}
          teamFlagTitle={(teamFlagInfo as TeamFlagInfo)?.teamFlagTitle}
          locker={(teamFlagInfo as TeamFlagInfo)?.locker}
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
      <ItemContextMenu afterDeleteHook={refreshAndLockAfterDelete} />
    </>
  );
}

export default TeamFlagDeatail;
