import React, { useContext, useMemo } from 'react';
import { Button } from 'antd';
import { HolderOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useContextMenu } from 'react-contexify';

import { ITEM_MENU_ID } from '@/components/ContextMenu';
import { RowContextProps, RowProps } from '../../types';

const RowContext = React.createContext<RowContextProps>({});

export const DragHandle: React.FC<{ isLock: boolean }> = ({ isLock }) => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);

  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: isLock ? 'not-allowed' : 'move' }}
      ref={setActivatorNodeRef}
      {...(isLock ? {} : listeners)}
    />
  );
};

const Row: React.FC<RowProps> = (props) => {
  // 右键菜单 hook
  const { show: showItemContextMenu } = useContextMenu({
    id: ITEM_MENU_ID,
    props: {
      id: props['data-row-key']
    }
  });

  // 拖拽相关的 hook
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key']
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {})
  };

  const contextValue = useMemo<RowContextProps>(() => ({ setActivatorNodeRef, listeners }), [setActivatorNodeRef, listeners]);

  return (
    <RowContext.Provider value={contextValue}>
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        onContextMenu={(e: React.MouseEvent) => {
          showItemContextMenu({ event: e });
        }}
      />
    </RowContext.Provider>
  );
};

export default Row;
