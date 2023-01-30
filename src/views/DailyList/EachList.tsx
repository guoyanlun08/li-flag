import React from 'react';
import { ListBox, ListItemBox, DailyListContainer } from './Styles';
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

export function EachList(props: propsType) {
  const { bgColor, title, listData, dragStatus, selectedId, setSelectedId } = props;
  return (
    <DailyListContainer bgColor={bgColor}>
      <Droppable droppableId={`droppable-list-${title}`} type="listType">
        {(provided) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            {listData.map((item, index) => (
              <ListItemBox key={item.id}>
                <ListItem
                  {...item}
                  module={`droppable-list-${title}`}
                  index={index}
                  dragStatus={dragStatus}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                />
              </ListItemBox>
            ))}
            {provided.placeholder}
          </ListBox>
        )}
      </Droppable>
    </DailyListContainer>
  );
}
