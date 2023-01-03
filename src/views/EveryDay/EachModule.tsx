import React from 'react';
import { EachModuleContainer, Title, ListBox } from './Styles';
import { Droppable } from 'react-beautiful-dnd';

import { ListItem } from '@/components/ListItem';

import { listItem } from './index'

interface propsType {
  bgColor: string;
  title: string;
  listData: listItem[];
  selectedId: number;
  setSelectedId: (v: number) => void;
}

export function EachModule(props: propsType) {

  return (
    <EachModuleContainer bgColor={props.bgColor}>
      <Title>{props.title}</Title>
      <Droppable droppableId={`droppable-list-${props.title}`} type="listType">
        {
          (provided) => (
            <ListBox ref={provided.innerRef} {...provided.droppableProps}>
              {
                props.listData.map((item, index) => (
                  <ListItem
                    key={item.id}
                    id={item.id}
                    index={index}
                    text={item.text}
                    completed={item.completed}
                    selectedId={props.selectedId}
                    setSelectedId={props.setSelectedId}
                  />))
              }
              {provided.placeholder}
            </ListBox>
          )
        }
      </Droppable>
    </EachModuleContainer>
  );
}
