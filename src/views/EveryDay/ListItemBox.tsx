import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { todoListItemType } from '@/types/todoType';

import { ListItem } from '@/components/ListItem';

interface propsType {
  listData: todoListItemType[];
}

function ListItemBox(props: propsType) {
  const { listData } = props;

  return (
    <div>
      {listData.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <ListItem {...item} editable={true} dragHandle={provided.dragHandleProps} index={index} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}

export default ListItemBox;
