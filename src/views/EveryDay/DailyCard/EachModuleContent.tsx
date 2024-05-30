import React from 'react';
import { Collapse, Button } from 'antd';
import dayjs from 'dayjs';

import useItemOperation from '@/hooks/useItemOperation';

import TodoList from '../TodoList';
import { ListItem } from '@/components/ListItem';
import { ModuleFields } from '@/features/todo/constants';
import { TodoListItemType } from '@/types/todoType';
import { Styled_EachModuleContent, Styled_DelayListBox } from './Styles';

type PropsType = {
  moduleId: ModuleFields;
  listData: TodoListItemType[];
  delayListData: TodoListItemType[];
};

/** Collapse 右上角组件 */
const RightExtra = (delayListData: TodoListItemType[]) => {
  const { updateTodoItem, getTodoList, getDelayTodoList } = useItemOperation();

  // 顺延 delay数据
  const postponeDelayData = async (e: React.MouseEvent) => {
    e.stopPropagation();
    // 更新 delay数据 startTime、endTime为今天
    await Promise.all(
      delayListData.map((delayItem) => {
        const data = {
          ...delayItem,
          startTime: dayjs().startOf('day').valueOf(),
          endTime: dayjs().endOf('day').valueOf()
        };

        return updateTodoItem(data);
      })
    );

    setTimeout(() => {
      getTodoList();
      getDelayTodoList();
    }, 200);
  };

  return delayListData.length ? (
    <Button size="small" type="link" onClick={(e) => postponeDelayData(e)}>
      顺延
    </Button>
  ) : null;
};

/** 卡片模块的内容区域 */
const EachModuleContent = (props: PropsType) => {
  const { moduleId, listData, delayListData } = props;

  // Collapse 的子项
  const delayItems = [
    {
      key: '1',
      label: '已过期',
      children: delayListData.map((delayItem, index) => (
        <ListItem key={delayItem.id} todoItem={delayItem} editable={false} index={index} />
      )),
      extra: RightExtra(delayListData)
    }
  ];

  return (
    <Styled_EachModuleContent>
      {/* 时间段内的 todoList */}
      <TodoList listData={listData} moduleId={moduleId} />

      {/* 昨日未完成的 todoList */}
      <Styled_DelayListBox>
        <Collapse defaultActiveKey={['1']} items={delayItems} />
      </Styled_DelayListBox>
    </Styled_EachModuleContent>
  );
};
export default EachModuleContent;
