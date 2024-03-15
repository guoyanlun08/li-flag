import React, { useEffect, useState } from 'react';
import moment from 'moment';

import api from '@/utils/httpRequest';
import { todoListItemType } from '@/types/todoType';

import { Theme, Condition, CompletedList } from './comp';
import { Styled_Container } from './Styles';

export type recentFormType = {
  recentDays: number;
  isSkip: boolean;
  moduleId?: string;
};

/** 近 x 天的数据 */
const recentDaysFormat = (days: number) => {
  return {
    startTime: moment()
      .subtract(days - 1, 'days')
      .startOf('day')
      .format(),
    endTime: moment().endOf('day').format()
  };
};
/** recentForm 初始化 */
const initRecentFormValue: recentFormType = {
  recentDays: 3,
  isSkip: false,
  moduleId: undefined
};

/** 近期完成模块 */
function RecentlyCompleted() {
  const [completedList, setCompletedList] = useState<todoListItemType[]>([]);
  const [isToday, setIsToday] = useState(false);
  const [recentForm, setRecentForm] = useState(initRecentFormValue);

  useEffect(() => {
    fetchCompletedList();
  }, []);

  // 获取已完成 itemList ———— 时间、模块过滤
  const fetchCompletedList = async (changeValue?: Partial<recentFormType>) => {
    const form = { ...recentForm, ...changeValue };
    const { startTime, endTime } = recentDaysFormat(form.recentDays);
    const data = {
      startTime,
      endTime,
      isSkip: form.isSkip,
      moduleId: form.moduleId
    };

    await apiGetTodoList(data);
    setRecentForm(form);
  };

  // 获取 todoList 接口调用
  const apiGetTodoList = async (data: Partial<{ startTime: string; endTime: string; isSkip: boolean; moduleId: string }>) => {
    const {
      data: { list }
    } = await api.get('/todoItem/getTodoList', { completed: 1, ...data });
    setCompletedList(list);
  };

  const resetRecentForm = () => {
    fetchCompletedList(initRecentFormValue);
  };

  // 切换是不是 今日
  const toggleIsToday = async (isToday: boolean) => {
    if (isToday) {
      const { startTime, endTime } = recentDaysFormat(1);
      await apiGetTodoList({ startTime, endTime });
    } else {
      await fetchCompletedList(recentForm);
    }
    setIsToday(isToday);
  };

  return (
    <Styled_Container>
      <Theme day={recentForm.recentDays} isToday={isToday} toggleIsToday={toggleIsToday} />
      <Condition isToday={isToday} form={recentForm} handleChange={fetchCompletedList} handleReset={resetRecentForm} />
      <CompletedList completedList={completedList} />
    </Styled_Container>
  );
}

export default RecentlyCompleted;
