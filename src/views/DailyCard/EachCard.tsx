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
  const { bgColor, title, listData, dragStatus, selectedId, setSelectedId } = props;

  return (
    <EachModuleContainer bgColor={bgColor}>
      <Title>{title}</Title>
      <Droppable droppableId={`droppable-list-${title}`} type="listType">
        {(provided, snapshot) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            {listData.map((item, index) => (
              <ListItem
                {...item}
                module={`droppable-list-${title}`}
                key={item.id}
                dragStatus={dragStatus}
                index={index}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ))}

            {provided.placeholder}
          </ListBox>
        )}
      </Droppable>
    </EachModuleContainer>
  );
}
