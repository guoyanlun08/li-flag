import React from 'react';
import { EachModuleContainer, Title, ListBox } from './Styles';
import { Droppable } from 'react-beautiful-dnd';

import { ListItem } from '@/components/ListItem';

import { listItemType } from '@/types/todoType';

interface propsType {
  bgColor: string;
  title: string;
  listData: listItemType[];
  dragStatus: boolean;
  selectedId: number;
  setSelectedId: (v: number) => void;
}

export function EachCard(props: propsType) {
  return (
    <EachModuleContainer bgColor={props.bgColor}>
      <Title>{props.title}</Title>
      <Droppable droppableId={`droppable-list-${props.title}`} type="listType">
        {(provided, snapshot) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            {props.listData.map((item, index) => (
              <ListItem
                {...item}
                key={item.id}
                dragStatus={props.dragStatus}
                index={index}
                selectedId={props.selectedId}
                setSelectedId={props.setSelectedId}
              />
            ))}

            {provided.placeholder}
          </ListBox>
        )}
      </Droppable>
    </EachModuleContainer>
  );
}
