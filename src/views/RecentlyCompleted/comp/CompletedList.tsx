import React from 'react';

import { todoListItemType } from '@/types/todoType';

import { ListItem } from '@/components/ListItem';
import { Styled_CompletedList } from '../Styles';

type propsType = {
  completedList: todoListItemType[];
};

/** 近期模块 —— completed列表 */
function CompletedList(props: propsType) {
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
