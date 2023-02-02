import React, { useMemo, useState } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

import { Item, ItemContent, EditNode } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { addTodoItem } from '@/features/todo/todoSlice';

interface PropsType {
  module: string;
  id: number;
  index: number;
  text: string;
  completed: boolean;
  dragStatus: boolean;
  selectedId: number;
  setSelectedId: (v: number) => void;
}

export function ListItem(props: PropsType) {
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const [completed, setCompleted] = useState(props.completed); // item状态
  const [textValue, setTextValue] = useState(props.text);
  const [isHover, setIsHover] = useState(false);

  // 是否选中当前 Item
  const isSelected = useMemo(() => props.selectedId === props.id, [props.selectedId, props.id]);

  const clickItemFn = () => {
    props.setSelectedId(props.id);
  };

  const mouseEnterItemFn = () => {
    if (props.dragStatus) return;
    setIsHover(true);
  };
  const mouseLeaveItemFn = () => {
    if (props.dragStatus) return;
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
      if (eachModule[props.module].listData.length - 1 === props.index) {
        dispatch(addTodoItem({ moduleId: props.module, type: 'tail' }));
      } else {
        console.log(props.index);
        dispatch(addTodoItem({ moduleId: props.module, type: 'interval', insertIndex: props.index }));
      }
    }
  };

  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
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
          <Checkbox checked={completed} onChange={() => setCompleted(!completed)} />
          <ItemContent selected={isSelected} completed={completed}>
            <EditNode
              id="contentEditableContainer"
              contentEditable={true}
              data-module={props.module}
              data-id={props.id}
              dangerouslySetInnerHTML={{ __html: textValue }}
              onInput={inputChange}
              onKeyDown={onKeyDownFn}
            />
          </ItemContent>
        </Item>
      )}
    </Draggable>
  );
}
