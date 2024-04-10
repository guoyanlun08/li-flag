import React from 'react';

import { TodoListItemType } from '@/types/todoType';

import { ListItem } from '@/components/ListItem';
import { Styled_CompletedList } from '../Styles';

type PropsType = {
  completedList: TodoListItemType[];
};

/** 近期模块 —— completed列表 */
function CompletedList(props: PropsType) {
  const { completedList } = props;

  return (
    <Styled_CompletedList>
      {completedList.map((item, index) => {
        return <ListItem key={item.id} todoItem={item} editable={false} index={index} />;
      })}
    </Styled_CompletedList>
  );
}

export default CompletedList;
