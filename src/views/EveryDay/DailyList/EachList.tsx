import React from 'react';
import { ListBox, DailyListContainer } from './Styles';
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
    <DailyListContainer bgColor={bgColor}>
      <Droppable droppableId={moduleId} type="listType">
        {(provided) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            <ListItemBox listData={listData} moduleId={moduleId} />
            {provided.placeholder}
          </ListBox>
        )}
      </Droppable>
    </DailyListContainer>
  );
}
