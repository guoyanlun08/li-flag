import React, { useContext, useMemo } from 'react';
import { Button } from 'antd';
import { HolderOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  const id = props['data-row-key'];
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging && id ? { position: 'relative', zIndex: 9999 } : {})
  };

  const contextValue = useMemo<RowContextProps>(() => ({ setActivatorNodeRef, listeners }), [setActivatorNodeRef, listeners]);

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

export default Row;
