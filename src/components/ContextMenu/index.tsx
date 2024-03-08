import React from 'react';
import { Menu, Item, ItemParams } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

import { useAppDispatch } from '@/app/hooks';
import { getTodoListThunk, deleteTodoItemThunk, setTodoModule } from '@/features/todo/todoSlice';

interface ContextMenuProps {
  moduleId?: string;
  id?: number;
}

function ContextMenu(props: ContextMenuProps) {
  const dispatch = useAppDispatch();

  const deleteItemClick = async ({ event, props, triggerEvent, data }: ItemParams) => {
    const { id, moduleId } = props;
    await dispatch(deleteTodoItemThunk({ id }));
    const { payload: list } = await dispatch(getTodoListThunk({ moduleId, today: true }));
    dispatch(setTodoModule({ list, moduleId }));
  };

  return (
    <Menu id={ITEM_MENU_ID} animation="scale">
      <Item onClick={deleteItemClick}>删除</Item>
    </Menu>
  );
}

export const ITEM_MENU_ID = 'itemContextMenu';

export default ContextMenu;
