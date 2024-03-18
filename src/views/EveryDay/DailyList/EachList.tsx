import React from 'react';
import { Styled_ListBox, Styled_DailyListContainer } from './Styles';
import { Droppable } from 'react-beautiful-dnd';
import ListItemBox from '../ListItemBox';

import { TodoListItemType } from '@/types/todoType';
interface PropsType {
  bgColor: string;
  moduleId: string;
  listData: TodoListItemType[];
}

export function EachList(props: PropsType) {
  const { bgColor, moduleId, listData } = props;
  return (
    <Styled_DailyListContainer bgColor={bgColor}>
      <Droppable droppableId={moduleId} type="listType">
        {(provided) => (
          <Styled_ListBox ref={provided.innerRef} {...provided.droppableProps}>
            <ListItemBox listData={listData} />
            {provided.placeholder}
          </Styled_ListBox>
        )}
      </Droppable>
    </Styled_DailyListContainer>
  );
}
