import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useContextMenu } from 'react-contexify';

import useItemOperation from '../../hooks/useItemOperation';

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
  dragStatus?: boolean;
  showMenuOutlined?: boolean;
  showCheckbox?: boolean;
  afterCheckBoxChange?: () => void;
  afterTextChangeHook?: () => void;
}

export function ListItem(props: PropsType) {
  const {
    editable,
    index,
    dragHandle,
    todoItem,
    dragStatus = false,
    showMenuOutlined = true,
    showCheckbox = true,
    afterCheckBoxChange = () => {},
    afterTextChangeHook = () => {}
  } = props;
  const { moduleId, id, completed } = todoItem;

  // TODO: 考虑放上层组件，新增 todo 需要
  const [selectedId, setSelectedId] = useState(-1);
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
    if (!dragStatus) {
      // 拖拽结束，去除 hover 状态
      setIsHover(false);
    }
  }, [dragStatus]);

  const isSelected = selectedId === id;

  // 打开右键菜单
  const onContextMenu = (e: React.MouseEvent) => {
    showItemContextMenu({ event: e });
  };

  /** 选中 item 触发 */
  const selectItemFn = () => {
    setSelectedId(id);
  };

  /** 鼠标移入 hover */
  const mouseEnterItemFn = () => {
    if (dragStatus) return;
    setIsHover(true);
  };

  /** 鼠标移出 取消hover */
  const mouseLeaveItemFn = () => {
    if (dragStatus) return;
    setIsHover(false);
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
      {showMenuOutlined && <MenuOutlined style={{ opacity: editable && isHover ? 1 : 0 }} className="drag-handle" {...dragHandle} />}
      {showCheckbox && (
        <Checkbox
          checked={Boolean(completed)}
          disabled={!editable}
          onChange={async () => {
            const hadUpdated = await updateTodoItem({ id, completed: Number(!completed) });
            if (hadUpdated) {
              afterCheckBoxChange();
            }
          }}
        />
      )}
      <div className="item-content-date">
        <Styled_ItemContent completed={completed} selected={isSelected}>
          <EditNode
            todoItem={todoItem}
            index={index}
            selected={isSelected}
            readOnly={!editable}
            afterTextChangeHook={afterTextChangeHook}
          />
        </Styled_ItemContent>
        <SelfDatePicker todoItem={todoItem} completed={Boolean(completed)} />
      </div>
    </Styled_Item>
  );
}
