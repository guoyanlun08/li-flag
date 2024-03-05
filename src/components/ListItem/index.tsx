import React, { useState, useContext, useEffect } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { toggleItemCompletedStatus, setSelectedId, getTodoListThunk, deleteTodoItemThunk } from '@/features/todo/todoSlice';
import api from '@/utils/httpRequest';
import { EveryDayContext } from '@/views/EveryDay';

import { Styled_Item, Styled_ItemContent } from './Styles';
import { EditNode } from './EditNode';
interface PropsType {
  moduleId: string;
  id: number;
  index: number;
  todoValue: string;
  completed: number;
  editable: boolean;
  dragHandle?: any;
}

export function ListItem(props: PropsType) {
  const { moduleId, id, editable, todoValue, index, completed, dragHandle } = props;

  const context = useContext(EveryDayContext);
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((store) => store.todo);
  const MENU_ID = 'rightMenu';
  const { show, hideAll: hideContextMenu } = useContextMenu({
    id: MENU_ID,
    props: {
      id
    }
  });

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!context.dragStatus) {
      setIsHover(false);
    }
  }, [context.dragStatus]);

  const isSelected = todoState.selectedId === id;

  const selectItemFn = () => {
    dispatch(setSelectedId({ id }));
  };

  const mouseEnterItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(true);
  };
  const mouseLeaveItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(false);
  };
  const displayMenu = (e: React.MouseEvent) => {
    show({
      event: e
    });
  };
  const deleteItemClick = async ({ event, props, triggerEvent, data }: ItemParams) => {
    const { id } = props;
    await dispatch(deleteTodoItemThunk({ id }));
    await dispatch(getTodoListThunk());
    hideContextMenu();
  };

  return (
    <>
      <Styled_Item
        selected={isSelected}
        onMouseDown={selectItemFn}
        onMouseEnter={mouseEnterItemFn}
        onMouseLeave={mouseLeaveItemFn}
        onDoubleClick={(e) => e.stopPropagation()}
        onContextMenu={displayMenu}>
        <MenuOutlined style={{ display: editable && isHover ? 'block' : 'none' }} className="drag-handle" {...dragHandle} />
        <Checkbox
          checked={Boolean(completed)}
          disabled={!editable}
          onChange={() => dispatch(toggleItemCompletedStatus({ moduleId: moduleId, itemIndex: index }))}
        />
        <Styled_ItemContent selected={isSelected}>
          {/* todo: 展示 value的 text需要处理 */}
          {editable ? <EditNode todoValue={todoValue} selected={isSelected} /> : <div></div>}
        </Styled_ItemContent>
      </Styled_Item>

      <Menu id={MENU_ID} animation="scale">
        <Item onClick={deleteItemClick}>删除</Item>
      </Menu>
    </>
  );
}
