import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { getToken } from '@/utils/localStorage';
import { getTodoListThunk } from '@/features/todo/todoSlice';

import DailyCard from './DailyCard';
import DailyList from './DailyList';

interface propsType {
  switchList: boolean;
}

interface IEveryDayContext {
  dragStatus: boolean;
  setDragStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EveryDayContext = React.createContext<IEveryDayContext>({} as any);

function EveryDay(props: propsType) {
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const [dragStatus, setDragStatus] = useState(false); // 当前拖拽状态

  // todo: 应该需要抽离一个 hook
  useEffect(() => {
    const fetchTodoListHadToken = async () => {
      await dispatch(getTodoListThunk());
    };

    if (getToken()) {
      console.log('有token情况');
      fetchTodoListHadToken();
    } else {
      console.log('无token情况');
    }
  }, []);

  // 传递子元素 props
  const dailyProps = {
    eachModule,
    eachModuleOrder
  };

  return (
    <EveryDayContext.Provider value={{ dragStatus, setDragStatus }}>
      <DragDropContext
        onBeforeDragStart={() => onBeforeDragStart(setDragStatus)}
        onDragEnd={(result) => onDragEnd(result, setDragStatus, eachModule, dispatch)}>
        {props.switchList ? <DailyList {...dailyProps} /> : <DailyCard {...dailyProps} />}
      </DragDropContext>
    </EveryDayContext.Provider>
  );
}

export default EveryDay;
