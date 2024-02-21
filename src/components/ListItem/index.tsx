import React, { useState, useContext } from 'react';
import { Checkbox } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useAppDispatch } from '@/app/hooks';
import { toggleItemCompletedStatus } from '@/features/todo/todoSlice';
import { EveryDayContext } from '@/views/EveryDay';

import { Styled_Item, Styled_ItemContent } from './Styles';
import { EditNode } from './EditNode';
interface PropsType {
  moduleId: string;
  id: number;
  index: number;
  value: {}[];
  completed: boolean;
  editable: boolean;
  dragHandle?: any;
}

export function ListItem(props: PropsType) {
  const context = useContext(EveryDayContext);
  const dispatch = useAppDispatch();

  const { moduleId, id, editable, value, index, completed, dragHandle } = props;
  const [isHover, setIsHover] = useState(false);

  const isSelected = context.selectedId === id;

  const selectItemFn = () => {
    context.setSelectedId(id);
  };

  const mouseEnterItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(true);
  };
  const mouseLeaveItemFn = () => {
    if (context.dragStatus) return;
    setIsHover(false);
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
        checked={completed}
        disabled={!editable}
        onChange={() => dispatch(toggleItemCompletedStatus({ moduleId: moduleId, itemIndex: index }))}
      />
      <Styled_ItemContent selected={isSelected} completed={completed}>
        {/* todo: 展示 value的 text需要处理 */}
        {editable ? <EditNode selected={isSelected} /> : <div></div>}
      </Styled_ItemContent>
    </Styled_Item>
  );
}
