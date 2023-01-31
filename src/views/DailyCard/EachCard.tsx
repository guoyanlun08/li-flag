import React, { MouseEvent } from 'react';
import { EachModuleContainer, Title, ListBox } from './Styles';
import { Droppable } from 'react-beautiful-dnd';

import { useAppDispatch } from '@/app/hooks';
import { addTodoItem } from '@/features/todo/todoSlice';
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
  const dispatch = useAppDispatch();

  const doubleAddItem = (e: MouseEvent) => {
    // todo: 数据结构定下来，这里都需要改 临时处理
    const moduleId = `droppable-list-${title}`;
    dispatch(addTodoItem({ moduleId }));
  };

  return (
    <EachModuleContainer bgColor={bgColor} onDoubleClick={doubleAddItem}>
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
