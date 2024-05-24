import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import ListItemBox from './ListItemBox';
import { Styled_EachModuleContent, Styled_ListBox, Styled_DelayListBox } from './Styles';
import { ModuleFields } from '@/features/todo/constants';
import { TodoListItemType } from '@/types/todoType';

type PropsType = {
  moduleId: ModuleFields;
  listData: TodoListItemType[];
  delayListData: any[];
};

const EachModuleContent = (props: PropsType) => {
  const { moduleId, listData, delayListData } = props;
  return (
    <Styled_EachModuleContent>
      {/* 时间段内的 todoList */}
      <Droppable droppableId={moduleId} type="listType">
        {(provided, snapshot) => (
          <Styled_ListBox ref={provided.innerRef} {...provided.droppableProps}>
            <ListItemBox listData={listData} />
            {provided.placeholder}
          </Styled_ListBox>
        )}
      </Droppable>

      {/* 昨日未完成的 todoList */}
      <Styled_DelayListBox>
        {delayListData.map(() => (
          <div>111</div>
        ))}
      </Styled_DelayListBox>
    </Styled_EachModuleContent>
  );
};
export default EachModuleContent;
