import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ModuleDataType } from '@/types/todoType';
import useItemOperation from '@/components/ListItem/useItemOperation';

import ListItemBox from '../ListItemBox';
import { Styled_EachModuleContainer, Styled_Title, Styled_ListBox } from './Styles';

interface PropsType {
  item: ModuleDataType;
  index: number;
}

export function EachCard(props: PropsType) {
  const { color, moduleId, listData, title } = props.item;
  const { addNewTodoItem } = useItemOperation();

  return (
    <Styled_EachModuleContainer index={props.index} onDoubleClick={() => addNewTodoItem(moduleId)}>
      <Styled_Title color={color}>
        <div className="title-icon">{moduleId}</div>
        <div>{title}</div>
      </Styled_Title>
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
