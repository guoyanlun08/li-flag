import React, { useState, useContext, useEffect } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { toggleItemCompletedStatus, setSelectedItem, updateTodoItemThunk } from '@/features/todo/todoSlice';
import { EveryDayContext } from '@/views/EveryDay';
import { TodoListItemType } from '@/types/todoType';

import { Styled_Item, Styled_ItemContent } from './Styles';
import { EditNode } from './EditNode';
interface PropsType {
  index: number;
  editable: boolean;
  dragHandle?: any;
  todoItem: TodoListItemType;
}

export function ListItem(props: PropsType) {
  const { editable, index, dragHandle, todoItem } = props;
  const { moduleId, id, todoValue, completed } = todoItem;

  const context = useContext(EveryDayContext);
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((store) => store.todo);

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!context.dragStatus) {
      setIsHover(false);
    }
  }, [context.dragStatus]);

  const isSelected = todoState.selectedItem?.id === id;

  const selectItemFn = () => {
    dispatch(setSelectedItem({ todoItem }));
  };

  const mouseEnterItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(true);
  };

  const mouseLeaveItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(false);
  };

  const todoValueFormat = (value: string) => {
    return JSON.parse(value)[0].children[0].text;
  };

  return (
    <Styled_Item
      selected={isSelected}
      onMouseDown={selectItemFn}
      onMouseEnter={mouseEnterItemFn}
      onMouseLeave={mouseLeaveItemFn}
      onDoubleClick={(e) => e.stopPropagation()}>
      <MenuOutlined style={{ display: editable && isHover ? 'block' : 'none' }} className="drag-handle" {...dragHandle} />
      <Checkbox
        checked={Boolean(completed)}
        disabled={!editable}
        onChange={async () => {
          const { payload: hadUpdated = false } = await dispatch(updateTodoItemThunk({ id, completed: Number(!completed) }));
          if (hadUpdated) {
            dispatch(toggleItemCompletedStatus({ moduleId: moduleId, itemIndex: index }));
          }
        }}
      />
      <Styled_ItemContent selected={isSelected}>
        {/* todo: 展示 value的 text需要处理 */}
        {editable ? <EditNode todoValue={todoValue} selected={isSelected} /> : <div>{todoValueFormat(todoValue)}</div>}
      </Styled_ItemContent>
    </Styled_Item>
  );
}
