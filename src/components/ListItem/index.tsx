import React, { useMemo, useState, useContext } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import { Item, ItemContent, EditNode } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { addTodoItem, toggleItemCompletedStatus } from '@/features/todo/todoSlice';
import { EveryDayContext } from '@/views/EveryDay';

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

  const { moduleId, id, index, text, completed } = props;
  const [isHover, setIsHover] = useState(false);

  // 是否选中当前 Item
  const isSelected = useMemo(() => context.selectedId === id, [context.selectedId, id]);

  const clickItemFn = () => {
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

  const inputChange = (e: any) => {};

  const onKeyDownFn = (e: any) => {
    // 回退尽头
    if (e.target.innerHTML === '<p><br></p>' && e.code === 'Backspace') {
      e.preventDefault();
    }
    // 回车
    if (e.code === 'Enter') {
      // 末尾新增
      if (eachModule[moduleId].listData.length - 1 === index) {
        dispatch(addTodoItem({ moduleId: moduleId, type: 'tail' }));
      } else {
        dispatch(addTodoItem({ moduleId: moduleId, type: 'interval', insertIndex: index }));
      }
    }
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          selected={isSelected}
          onClick={clickItemFn}
          onMouseEnter={mouseEnterItemFn}
          onMouseLeave={mouseLeaveItemFn}
          onDoubleClick={(e) => e.stopPropagation()}>
          <MenuOutlined style={{ display: isHover ? 'block' : 'none' }} className="drag-handle" {...provided.dragHandleProps} />
          <Checkbox checked={completed} onChange={() => dispatch(toggleItemCompletedStatus({ moduleId: moduleId, itemIndex: index }))} />
          <ItemContent selected={isSelected} completed={completed}>
            <EditNode
              id="contentEditableContainer"
              contentEditable={true}
              dangerouslySetInnerHTML={{ __html: text }}
              onInput={inputChange}
              onKeyDown={onKeyDownFn}
            />
          </ItemContent>
        </Item>
      )}
    </Draggable>
  );
}
