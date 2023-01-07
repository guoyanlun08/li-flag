import React from 'react';
import { ListBox, ListItemBox, DailyListContainer } from './Styles';
import { Droppable } from 'react-beautiful-dnd';
import { ListItem } from '@/components/ListItem';

import { listItem } from './index';

interface propsType {
  bgColor: string;
  title: string;
  listData: listItem[];
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
              <ListItemBox>
                <ListItem
                  {...item}
                  key={item.id}
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
