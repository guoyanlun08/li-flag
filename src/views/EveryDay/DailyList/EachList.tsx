import React from 'react';
import { Styled_ListBox, Styled_DailyListContainer } from './Styles';
import { Droppable } from 'react-beautiful-dnd';
import ListItemBox from '../ListItemBox';

import { ModuleDataType } from '@/types/todoType';
interface PropsType {
  item: ModuleDataType;
}

export function EachList(props: PropsType) {
  const { color, moduleId, listData, title } = props.item;

  return (
    <Styled_DailyListContainer>
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
