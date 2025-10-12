import React from 'react';
import { Menu, Item, ItemParams } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

import { useItemOperation } from '@/hooks';

interface ItemContextMenuProps {
  moduleId?: string;
  id?: number;
  /** 删除后的钩子 */
  afterDeleteHook?: () => Promise<void>;
}

function ItemContextMenu(contextMenuProps: ItemContextMenuProps) {
  const { afterDeleteHook } = contextMenuProps;
  const { deleteTodoItem } = useItemOperation();

  const deleteItemClick = async ({ event, props, triggerEvent, data }: ItemParams) => {
    const { id, moduleId } = props;

    await deleteTodoItem(id);

    if (afterDeleteHook) {
      await afterDeleteHook();
    }
  };

  return (
    <Menu id={ITEM_MENU_ID} animation="scale">
      <Item onClick={deleteItemClick}>删除</Item>
    </Menu>
  );
}

export const ITEM_MENU_ID = 'itemContextMenu';

export default ItemContextMenu;
