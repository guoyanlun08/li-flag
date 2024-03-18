import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { DragDropContext } from 'react-beautiful-dnd';
import { useContextMenu } from 'react-contexify';

import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { getToken } from '@/utils/localStorage';
import { getTodoListThunk, setTodoEntireModule } from '@/features/todo/todoSlice';

import DailyCard from './DailyCard';
import DailyList from './DailyList';
import ContextMenu, { ITEM_MENU_ID } from '@/components/ContextMenu';

interface IEveryDayContext {
  dragStatus: boolean;
  setDragStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EveryDayContext = React.createContext<IEveryDayContext>({} as any);

function EveryDay() {
  const { search } = useLocation();

  const { eachModule, eachModuleOrder, selectedItem } = useAppSelector((state) => state.todo);
  const { id, moduleId } = selectedItem || {};

  const dispatch = useAppDispatch();
  const { show: showItemContextMenu } = useContextMenu({
    id: ITEM_MENU_ID,
    props: {
      id,
      moduleId
    }
  });

  const [dragStatus, setDragStatus] = useState(false); // 当前拖拽状态

  // todo: 应该需要抽离一个 hook
  useEffect(() => {
    const fetchTodoListHadToken = async () => {
      const { payload: list } = await dispatch(getTodoListThunk({ today: true }));
      if (list) {
        dispatch(setTodoEntireModule({ list }));
      }
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
    eachModuleOrder,
    showItemContextMenu
  };

  return (
    <EveryDayContext.Provider value={{ dragStatus, setDragStatus }}>
      <DragDropContext
        onBeforeDragStart={() => onBeforeDragStart(setDragStatus)}
        onDragEnd={(result) => onDragEnd(result, setDragStatus, eachModule, dispatch)}>
        {qs.parse(search).listMode ? <DailyList {...dailyProps} /> : <DailyCard {...dailyProps} />}
      </DragDropContext>
      <ContextMenu moduleId={moduleId} id={id} />
    </EveryDayContext.Provider>
  );
}

export default EveryDay;
