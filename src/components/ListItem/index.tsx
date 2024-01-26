import React, { useMemo, useState, useContext, useRef, useEffect } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import { Item, ItemContent } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { idNum, addTodoItem, toggleItemCompletedStatus } from '@/features/todo/todoSlice';
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
  const { eachModule } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const editRef = useRef<HTMLDivElement>(null);

  const { moduleId, id, index, text, completed } = props;
  const [isHover, setIsHover] = useState(false);

  // 是否选中当前 Item
  const isSelected = useMemo(() => context.selectedId === id, [context.selectedId, id]);

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
            {/* <EditNode
              ref={editRef}
              id="contentEditableContainer"
              contentEditable
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: text }}
            /> */}
            <EditNode selected={isSelected} />
          </ItemContent>
        </Item>
      )}
    </Draggable>
  );
}
