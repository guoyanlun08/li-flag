import React, { MouseEvent } from 'react';
import { EachModuleContainer, Title, ListBox } from './Styles';
import { Droppable } from 'react-beautiful-dnd';

import { useAppDispatch } from '@/app/hooks';
import { addTodoItem } from '@/features/todo/todoSlice';
import ListItemBox from '../ListItemBox';

import { listItemType } from '@/types/todoType';

interface propsType {
  bgColor: string;
  moduleId: string;
  title: string;
  listData: listItemType[];
  dragStatus: boolean;
  selectedId: number;
  setSelectedId: (v: number) => void;
}

export function EachCard(props: propsType) {
  const { bgColor, moduleId, title, listData, dragStatus, selectedId, setSelectedId } = props;
  const dispatch = useAppDispatch();

  const doubleAddItem = (e: MouseEvent) => {
    dispatch(addTodoItem({ moduleId, type: 'tail' }));
  };

  return (
    <EachModuleContainer bgColor={bgColor} onDoubleClick={doubleAddItem}>
      <Title>{title}</Title>
      <Droppable droppableId={moduleId} type="listType">
        {(provided, snapshot) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            <ListItemBox
              listData={listData}
              moduleId={moduleId}
              dragStatus={dragStatus}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
            {provided.placeholder}
          </ListBox>
        )}
      </Droppable>
    </EachModuleContainer>
  );
}
