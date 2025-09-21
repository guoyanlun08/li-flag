import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { apiGetTeamFlagAllInfoById, apiGetTeamFlagInfoById } from '@/apis/teamFlag';
import { updateTodoOrder, apiGetTodoItemsForTeamFlags } from '@/apis/todoItem';
import { usePolling } from '@/hooks';
import { TeamFlagFilter, TeamFlagOperation, TeamTodoTable, AddTodoBtn } from './components';
import { TEAM_FLAG_INFO_POLLING_TIME } from './constants';
import { Styled_TeamFlagDetail } from './Styles';
import { TodoListItemType } from '@/types/todoType';
import { teamFlagInfo } from '../types';

/** 获取 teamFlag 对应的 todoList */
async function getTeamFlagTodoList(teamFlagId: number) {
  const todoListForTeamFlags = await apiGetTodoItemsForTeamFlags({ teamFlagids: teamFlagId });
  const todoList = todoListForTeamFlags?.[teamFlagId]?.todoList || [];

  return todoList;
}

function TeamFlagDeatail() {
  const routeParams = useParams();
  const teamFlagId = Number(routeParams.teamFlagId);

  const [teamFlagInfo, setTeamFlagInfo] = useState<teamFlagInfo>({});
  const [teamTodoList, setTeamTodoList] = useState<TodoListItemType[]>([]);

  const fetchTeamFlagInfo = useCallback(() => {
    return apiGetTeamFlagInfoById({ teamFlagId });
  }, [teamFlagId]);

  const { pollingData } = usePolling(fetchTeamFlagInfo, TEAM_FLAG_INFO_POLLING_TIME);

  useEffect(() => {
    const fetchTeamFlagInfo = async () => {
      try {
        const { todoList, ...teamFlagInfo } = await apiGetTeamFlagAllInfoById({ teamFlagId });

        setTeamFlagInfo(teamFlagInfo);
        setTeamTodoList(todoList || []);
      } catch (error) {
        console.error('[TeamFlagDetail] 获取团队Flag信息失败:', error);
      }
    };

    fetchTeamFlagInfo();
  }, [teamFlagId]);

  useEffect(() => {
    console.log('[TeamFlagDetail] pollingData', pollingData);
  }, [pollingData]);

  const dragChangeTeamTodoList = async (newVal: TodoListItemType[], oldVal: TodoListItemType[]) => {
    setTeamTodoList(newVal);
    const { updated } = await updateTodoOrder({ todoList: newVal });
    if (!updated) {
      setTeamTodoList(oldVal);
    }
  };

  const refreshTeamTodoList = async () => {
    const todoList = await getTeamFlagTodoList(teamFlagId);
    setTeamTodoList(todoList);
  };

  return (
    <>
      <Styled_TeamFlagDetail>
        <TeamFlagOperation />
        <div className="page-content">
          <div className="page-content-body">
            <div className="filter-form">
              <AddTodoBtn teamFlagId={teamFlagId} refreshTeamTodoList={refreshTeamTodoList} />
              <TeamFlagFilter />
            </div>
            <div className="flag-item-table">
              <TeamTodoTable
                todoList={teamTodoList}
                dragChangeTeamTodoList={dragChangeTeamTodoList}
                refreshTeamTodoList={refreshTeamTodoList}
              />
            </div>
          </div>
        </div>
      </Styled_TeamFlagDetail>
    </>
  );
}

export default TeamFlagDeatail;
