import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { DragDropContext } from 'react-beautiful-dnd';

import { useAppSelector, AuthContext } from '@/app/hooks';
import useItemOperation from '@/components/ListItem/useItemOperation';

import DailyCard from './DailyCard';
import DailyList from './DailyList';
import { ItemContextMenu } from '@/components/ContextMenu';

interface IEveryDayContext {
  dragStatus: boolean;
  handleSetDragStatus: (val: boolean) => void;
}

export const EveryDayContext = React.createContext<IEveryDayContext>({} as any);

function EveryDay() {
  const { search } = useLocation();
  const { isLogin } = useContext(AuthContext);
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const { getTodoList, onBeforeDragStart, onDragEnd } = useItemOperation();

  const [dragStatus, setDragStatus] = useState(false); // 当前拖拽状态

  useEffect(() => {
    const fetchTodoList = async () => {
      await getTodoList({ today: true });
    };

    if (isLogin) {
      fetchTodoList();
    }
  }, [isLogin]);

  // 修改当前拖拽态
  const handleSetDragStatus = (val: boolean) => {
    setDragStatus(val);
  };

  // 传递子元素 props
  const dailyProps = {
    eachModule,
    eachModuleOrder
  };

  return (
    <EveryDayContext.Provider value={{ dragStatus, handleSetDragStatus }}>
      <DragDropContext
        onBeforeDragStart={() => onBeforeDragStart(handleSetDragStatus)}
        onDragEnd={async (result) => await onDragEnd(result, handleSetDragStatus, eachModule)}>
        {qs.parse(search).listMode ? <DailyList {...dailyProps} /> : <DailyCard {...dailyProps} />}
      </DragDropContext>
      <ItemContextMenu />
    </EveryDayContext.Provider>
  );
}

export default EveryDay;
