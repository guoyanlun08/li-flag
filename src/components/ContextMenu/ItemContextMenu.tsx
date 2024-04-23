import React from 'react';
import { Menu, Item, ItemParams } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

import useItemOperation from '@/components/ListItem/useItemOperation';

interface ItemContextMenuProps {
  moduleId?: string;
  id?: number;
}

function ItemContextMenu(contextMenuProps: ItemContextMenuProps) {
  const { deleteTodoItem, getTodoList } = useItemOperation();

  const deleteItemClick = async ({ event, props, triggerEvent, data }: ItemParams) => {
    const { id, moduleId } = props;

    await deleteTodoItem(id);

    await getTodoList({});
  };

  return (
    <Menu id={ITEM_MENU_ID} animation="scale">
      <Item onClick={deleteItemClick}>删除</Item>
    </Menu>
  );
}

export const ITEM_MENU_ID = 'itemContextMenu';

export default ItemContextMenu;
