import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ModuleDataType, TodoListItemType } from '@/types/todoType';
import useItemOperation from '@/components/ListItem/useItemOperation';

import ListItemBox from '../ListItemBox';
import { Styled_EachModuleContainer, Styled_Title, Styled_ListBox } from './Styles';

interface PropsType {
  item: ModuleDataType;
}

export function EachCard(props: PropsType) {
  const { color, moduleId, listData, title } = props.item;
  const { addNewTodoItem } = useItemOperation();

  return (
    <Styled_EachModuleContainer onDoubleClick={() => addNewTodoItem(moduleId)}>
      <Styled_Title color={color}>(icon){title}</Styled_Title>
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
