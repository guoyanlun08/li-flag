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

/** 近期完成模块 */
function RecentlyCompleted() {
  const [completedList, setCompletedList] = useState<todoListItemType[]>([]);
  const [isToday, setIsToday] = useState(false);
  const [recentForm, setRecentForm] = useState<recentFormType>({
    recentDays: 3,
    isSkip: false,
    moduleId: undefined
  });

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

    setRecentForm(form);
    const {
      data: { list }
    } = await api.get('/todoItem/getTodoList', { completed: 1, ...data });
    setCompletedList(list);
  };

  // 切换是不是 今日
  const toggleIsToday = (isToday: boolean) => {
    setIsToday(isToday);
  };

  return (
    <Styled_Container>
      <Theme day={recentForm.recentDays} isToday={isToday} toggleIsToday={toggleIsToday} />
      <Condition form={recentForm} handleChange={fetchCompletedList} />
      <CompletedList completedList={completedList} />
    </Styled_Container>
  );
}

export default RecentlyCompleted;
