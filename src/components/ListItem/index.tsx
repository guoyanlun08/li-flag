import React, { useState, useContext, useEffect } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useContextMenu } from 'react-contexify';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { toggleItemCompletedStatus, setSelectedItem } from '@/features/todo/todoSlice';
import useItemOperation from './useItemOperation';

import { EveryDayContext } from '@/views/EveryDay/EveryDay';
import { TodoListItemType } from '@/types/todoType';
import { Styled_Item, Styled_ItemContent } from './Styles';
import { EditNode } from './EditNode';
import { ITEM_MENU_ID } from '@/components/ContextMenu';
import { SelfDatePicker } from '@/components/SelfDatePicker';

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
  const { updateTodoItem } = useItemOperation();

  // item右键菜单
  const { show: showItemContextMenu } = useContextMenu({
    id: ITEM_MENU_ID,
    props: {
      id,
      moduleId
    }
  });

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!context.dragStatus) {
      setIsHover(false);
    }
  }, [context.dragStatus]);

  const isSelected = todoState.selectedItem?.id === id;

  // 打开右键菜单
  const onContextMenu = (e: React.MouseEvent) => {
    if (isSelected) {
      showItemContextMenu({ event: e });
    }
  };

  /** 选中 item 触发 */
  const selectItemFn = () => {
    dispatch(setSelectedItem({ todoItem }));
  };

  /** 鼠标移入 hover */
  const mouseEnterItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(true);
  };

  /** 鼠标移出 取消hover */
  const mouseLeaveItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(false);
  };

  /** todoValue 显示于界面文本转化 */
  const todoValueFormat = (value: string) => {
    return JSON.parse(value)[0].children[0].text;
  };

  return (
    <Styled_Item
      selected={isSelected}
      moduleId={moduleId}
      onMouseDown={selectItemFn}
      onMouseEnter={mouseEnterItemFn}
      onMouseLeave={mouseLeaveItemFn}
      onContextMenu={onContextMenu}
      onDoubleClick={(e) => e.stopPropagation()}>
      <MenuOutlined style={{ display: editable && isHover ? 'block' : 'none' }} className="drag-handle" {...dragHandle} />
      <Checkbox
        checked={Boolean(completed)}
        disabled={!editable}
        onChange={async () => {
          const hadUpdated = await updateTodoItem({ id, completed: Number(!completed) });
          if (hadUpdated) {
            dispatch(toggleItemCompletedStatus({ moduleId, itemIndex: index }));
          }
        }}
      />
      <Styled_ItemContent completed={completed} selected={isSelected}>
        {editable ? <EditNode todoValue={todoValue} selected={isSelected} /> : <div>{todoValueFormat(todoValue)}</div>}
      </Styled_ItemContent>
      <SelfDatePicker todoItem={todoItem} />
    </Styled_Item>
  );
}
