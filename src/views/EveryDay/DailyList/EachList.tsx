import React from 'react';
import { ListBox, DailyListContainer } from './Styles';
import { Droppable } from 'react-beautiful-dnd';
import ListItemBox from '../ListItemBox';

import { listItemType } from '@/types/todoType';
interface propsType {
  bgColor: string;
  moduleId: string;
  title: string;
  listData: listItemType[];
  dragStatus: boolean;
  selectedId: number;
  setSelectedId: (v: number) => void;
}

export function EachList(props: propsType) {
  const { bgColor, moduleId, listData, dragStatus, selectedId, setSelectedId } = props;
  return (
    <DailyListContainer bgColor={bgColor}>
      <Droppable droppableId={moduleId} type="listType">
        {(provided) => (
          <ListBox ref={provided.innerRef} {...provided.droppableProps}>
            <ListItemBox
              listData={listData}
              moduleId={moduleId}
              dragStatus={dragStatus}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
            {provided.placeholder}
          </ListBox>
        )}
      </Droppable>
    </DailyListContainer>
  );
}
