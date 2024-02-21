import React from 'react';
import { Styled_ListBox, Styled_DailyListContainer } from './Styles';
import { Droppable } from 'react-beautiful-dnd';
import ListItemBox from '../ListItemBox';

import { todoListItemType } from '@/types/todoType';
interface propsType {
  bgColor: string;
  moduleId: string;
  listData: todoListItemType[];
}

export function EachList(props: propsType) {
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
