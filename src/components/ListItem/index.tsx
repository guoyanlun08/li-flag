import React, { useState, useContext, useRef, useEffect } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import { Item, ItemContent } from './Styles';
import { useAppDispatch } from '@/app/hooks';
import { toggleItemCompletedStatus } from '@/features/todo/todoSlice';
import { EveryDayContext } from '@/views/EveryDay';
import { EditNode } from './EditNode';
interface PropsType {
  moduleId: string;
  id: number;
  index: number;
  text: string;
  completed: boolean;
}

export function ListItem(props: PropsType) {
  const context = useContext(EveryDayContext);
  const dispatch = useAppDispatch();

  const editRef = useRef<HTMLDivElement>(null);

  const { moduleId, id, index, completed } = props;
  const [isHover, setIsHover] = useState(false);

  const isSelected = context.selectedId === id;

  useEffect(() => {
    if (editRef.current) {
      if (isSelected) {
        editRef.current.focus();
      }
    }
  }, [isSelected]);

  const selectItemFn = () => {
    context.setSelectedId(id);
  };

  const mouseEnterItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(true);
  };
  const mouseLeaveItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(false);
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided: any) => (
        <Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          selected={isSelected}
          onMouseDown={selectItemFn}
          onMouseEnter={mouseEnterItemFn}
          onMouseLeave={mouseLeaveItemFn}
          onDoubleClick={(e) => e.stopPropagation()}>
          <MenuOutlined style={{ display: isHover ? 'block' : 'none' }} className="drag-handle" {...provided.dragHandleProps} />
          <Checkbox checked={completed} onChange={() => dispatch(toggleItemCompletedStatus({ moduleId: moduleId, itemIndex: index }))} />
          <ItemContent selected={isSelected} completed={completed}>
            <EditNode selected={isSelected} />
          </ItemContent>
        </Item>
      )}
    </Draggable>
  );
}
