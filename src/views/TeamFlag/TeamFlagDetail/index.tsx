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
import { LockStatus, LOCK_TIMEOUT_MINUTES, TEAM_FLAG_INFO_POLLING_TIME, TodoListFilterParams } from './constants';

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

  const [teamFlagInfo, setTeamFlagInfo] = useState<Partial<TeamFlagInfo>>({});
  const [teamTodoList, setTeamTodoList] = useState<TodoListItemType[]>([]);
  const [filterParams, setFilterParams] = useState<{
    [TodoListFilterParams.Processor]: string;
    [TodoListFilterParams.Priority]: string;
  }>({
    processor: '',
    priority: ''
  });

  // 团队用户列表 - 队长和成员
  const teamUserList = useMemo(() => {
    const userList: string[] = [];
    const { teamLeader, teamMembers } = teamFlagInfo as TeamFlagInfo;
    userList.push(teamLeader);
    teamMembers && userList.push(...teamMembers.split(','));

    return userList;
  }, [teamFlagInfo]);

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

  /** 删除后刷新数据 */
  const refreshAndLockAfterDelete = useCallback(async () => {
    await Promise.all([refreshTeamTodoList(), autoLockTeamFlag()]);
  }, [autoLockTeamFlag, refreshTeamTodoList]);

  /** 过滤参数改变回调 */
  const filterParamsChange = useCallback(<T extends unknown>(field: string, value: T) => {
    setFilterParams((preVal) => {
      return {
        ...preVal,
        [field]: value
      };
    });
  }, []);

  const filteredTodoList = useMemo(
    () =>
      teamTodoList.filter((todo) => {
        // 遍历 filterParams 的所有键，自动检查每个过滤条件
        return Object.entries(filterParams).every(([key, value]) => {
          // 如果过滤值为空（未设置过滤条件），则跳过
          if (!value) return true;

          // 检查当前 todo 是否匹配过滤条件
          return todo[key as keyof TodoListItemType] === value;
        });
      }),
    [teamTodoList, filterParams]
  );

  return (
    <>
      {contextHolder}
      <Styled_TeamFlagDetail>
        <TeamFlagOperation
          teamFlagId={teamFlagId}
          lockStatus={lockStatus}
          userId={userId}
          refreshTeamFlagInfo={fetchAndUpdateTeamFlagInfo}
          teamFlagInfo={{ ...teamFlagInfo, teamDeadline: teamFlagInfo.teamDeadline ? dayjs(teamFlagInfo.teamDeadline) : null }}
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
              <TeamFlagFilter teamUserList={teamUserList} onFilterParamsChange={filterParamsChange} />
            </div>
            <div className="flag-item-table">
              <TeamTodoTable
                isLock={lockStatus === LockStatus.OtherLocked}
                todoList={filteredTodoList}
                dragChangeTeamTodoList={dragChangeTeamTodoList}
                refreshTeamTodoList={refreshTeamTodoList}
                onLockTeamFlag={autoLockTeamFlag}
                teamUserList={teamUserList}
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
