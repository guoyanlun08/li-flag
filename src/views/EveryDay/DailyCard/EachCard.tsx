import React, { MouseEvent } from 'react';
import { Styled_EachModuleContainer, Styled_Title, Styled_ListBox } from './Styles';
import { Droppable } from 'react-beautiful-dnd';

import { useAppDispatch } from '@/app/hooks';

import { addTodoItemThunk } from '@/features/todo/dataAndMethods';
import { todoListItemType } from '@/types/todoType';
import ListItemBox from '../ListItemBox';

interface propsType {
  bgColor: string;
  moduleId: string;
  listData: todoListItemType[];
}

export function EachCard(props: propsType) {
  const { bgColor, moduleId, listData } = props;
  const dispatch = useAppDispatch();

  const doubleAddItem = async (e: MouseEvent) => {
    const order = listData.length + 1;
    await dispatch(addTodoItemThunk({ moduleId, order, type: 'tail' }));
  };

  return (
    <Styled_EachModuleContainer bgColor={bgColor} onDoubleClick={doubleAddItem}>
      <Styled_Title>{moduleId}</Styled_Title>
      <Droppable droppableId={moduleId} type="listType">
        {(provided, snapshot) => (
          <Styled_ListBox ref={provided.innerRef} {...provided.droppableProps}>
            <ListItemBox listData={listData} />
            {provided.placeholder}
          </Styled_ListBox>
        )}
      </Droppable>
    </Styled_EachModuleContainer>
  );
}
