import React, { useMemo, useState } from 'react';
import { Item, ItemContent, EditNode } from './Styles';

import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';

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

  const keyDownFn = (e: any) => {
    if (e.target.innerHTML === '<p><br></p>' && e.code === 'Backspace') {
      e.nativeEvent.returnValue = false;
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
              onKeyDown={keyDownFn}
            />
          </ItemContent>
        </Item>
      )}
    </Draggable>
  );
}
