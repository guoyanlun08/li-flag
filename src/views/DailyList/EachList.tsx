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
  return (
    <DailyListContainer bgColor={props.bgColor}>
      <Droppable droppableId={`droppable-list-${props.title}`} type="listType">
        {(provided) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            {props.listData.map((item, index) => (
              <ListItemBox key={item.id}>
                <ListItem
                  {...item}
                  index={index}
                  dragStatus={props.dragStatus}
                  selectedId={props.selectedId}
                  setSelectedId={props.setSelectedId}
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
