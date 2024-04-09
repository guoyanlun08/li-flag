import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { TodoListItemType } from '@/types/todoType';
import useItemOperation from '@/components/ListItem/useItemOperation';

import ListItemBox from '../ListItemBox';
import { Styled_EachModuleContainer, Styled_Title, Styled_ListBox } from './Styles';

interface PropsType {
  bgColor: string;
  moduleId: string;
  listData: TodoListItemType[];
}

export function EachCard(props: PropsType) {
  const { bgColor, moduleId, listData } = props;
  const { addNewTodoItem } = useItemOperation();

  return (
    <Styled_EachModuleContainer bgColor={bgColor} onDoubleClick={() => addNewTodoItem(moduleId)}>
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
