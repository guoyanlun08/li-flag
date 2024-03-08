import React, { forwardRef, useImperativeHandle } from 'react';
import { Menu, Item, useContextMenu, ItemParams } from 'react-contexify';
import { useAppDispatch } from '@/app/hooks';
import { getTodoListThunk, deleteTodoItemThunk, setTodoModule } from '@/features/todo/todoSlice';

interface ContextMenuProps {
  moduleId: string;
  id: number;
}

function ContextMenu(props: ContextMenuProps, ref: React.ForwardedRef<any>) {
  const { moduleId, id } = props;
  const dispatch = useAppDispatch();
  const MENU_ID = 'rightMenu';
  const { show, hideAll: hideContextMenu } = useContextMenu({
    id: MENU_ID,
    props: {
      id,
      moduleId
    }
  });
  useImperativeHandle(ref, () => {
    return {
      show,
      hideContextMenu
    };
  });
  const deleteItemClick = async ({ event, props, triggerEvent, data }: ItemParams) => {
    const { id, moduleId } = props;
    await dispatch(deleteTodoItemThunk({ id }));
    const { payload: list } = await dispatch(getTodoListThunk({ moduleId, today: true }));
    dispatch(setTodoModule({ list, moduleId }));
    hideContextMenu();
  };
  return (
    <Menu id={MENU_ID} animation="scale">
      <Item onClick={deleteItemClick}>删除</Item>
    </Menu>
  );
}
export default forwardRef(ContextMenu);
