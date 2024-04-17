import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { DragDropContext } from 'react-beautiful-dnd';
import moment from 'moment';

import { useAppSelector, AuthContext } from '@/app/hooks';
import useItemOperation from '@/components/ListItem/useItemOperation';

import DailyCard from './DailyCard';
import DailyList from './DailyList';
import { ItemContextMenu } from '@/components/ContextMenu';
import { EachModuleType } from '@/types/todoType';

interface IEveryDayContext {
  dragStatus: boolean;
  handleSetDragStatus: (val: boolean) => void;
}

export const EveryDayContext = React.createContext<IEveryDayContext>({} as any);

export type DailyPropsType = {
  eachModule: EachModuleType;
};

function EveryDay() {
  const { search } = useLocation();
  const { isLogin } = useContext(AuthContext);
  const { eachModule } = useAppSelector((state) => state.todo);
  const { getTodoList, onBeforeDragStart, onDragEnd } = useItemOperation();

  const [dragStatus, setDragStatus] = useState(false); // 当前拖拽状态

  useEffect(() => {
    const fetchTodoList = async () => {
      await getTodoList({ today: true });
    };
    if (isLogin) {
      fetchTodoList();
    }

    // XXX：晚上 12点都会强制刷新，目前是强制的。后期这个需求再整理。
    const now = moment().valueOf();
    const endOfDay = moment().endOf('day').valueOf() + 1;

    const freshDataTimer = setTimeout(() => {
      console.log('12点刷新页面，更新新一天数据');
      window.location.reload();
    }, endOfDay - now);
    return () => clearTimeout(freshDataTimer);
  }, [isLogin]);

  // 修改当前拖拽态
  const handleSetDragStatus = (val: boolean) => {
    setDragStatus(val);
  };

  // 传递子元素 props
  const dailyProps: DailyPropsType = {
    eachModule
  };

  return (
    <EveryDayContext.Provider value={{ dragStatus, handleSetDragStatus }}>
      <DragDropContext
        onBeforeDragStart={() => onBeforeDragStart(handleSetDragStatus)}
        onDragEnd={async (result: any) => await onDragEnd(result, handleSetDragStatus, eachModule)}>
        {qs.parse(search).listMode ? <DailyList {...dailyProps} /> : <DailyCard {...dailyProps} />}
      </DragDropContext>
      <ItemContextMenu />
    </EveryDayContext.Provider>
  );
}

export default EveryDay;
