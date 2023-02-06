import React, { useContext, MouseEvent } from 'react';
import { EachModuleContainer, Title, ListBox } from './Styles';
import { Droppable } from 'react-beautiful-dnd';

import { useAppDispatch } from '@/app/hooks';
import { EveryDayContext } from '@/views/EveryDay';
import { idNum, addTodoItem } from '@/features/todo/todoSlice';
import { listItemType } from '@/types/todoType';
import ListItemBox from '../ListItemBox';

interface propsType {
  bgColor: string;
  moduleId: string;
  title: string;
  listData: listItemType[];
}

export function EachCard(props: propsType) {
  const context = useContext(EveryDayContext);

  const { bgColor, moduleId, title, listData } = props;
  const dispatch = useAppDispatch();

  const doubleAddItem = (e: MouseEvent) => {
    context.setSelectedId(idNum);
    dispatch(addTodoItem({ moduleId, type: 'tail' }));
  };

  return (
    <EachModuleContainer bgColor={bgColor} onDoubleClick={doubleAddItem}>
      <Title>{title}</Title>
      <Droppable droppableId={moduleId} type="listType">
        {(provided, snapshot) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            <ListItemBox listData={listData} moduleId={moduleId} />
            {provided.placeholder}
          </ListBox>
        )}
      </Droppable>
    </EachModuleContainer>
  );
}
