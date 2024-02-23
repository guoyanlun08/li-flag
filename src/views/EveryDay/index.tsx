import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';
import { useAppSelector, useAppDispatch } from '@/app/hooks';

import DailyCard from './DailyCard';
import DailyList from './DailyList';

interface propsType {
  switchList: boolean;
}

interface IEveryDayContext {
  dragStatus: boolean;
  selectedId: number;
  setDragStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
}

export const EveryDayContext = React.createContext<IEveryDayContext>({} as any);

function EveryDay(props: propsType) {
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const [dragStatus, setDragStatus] = useState(false); // 当前拖拽状态
  const [selectedId, setSelectedId] = useState<number>(-1); // 当前选中 item

  // 传递子元素 props
  const dailyProps = {
    eachModule,
    eachModuleOrder
  };

  return (
    <EveryDayContext.Provider value={{ dragStatus, setDragStatus, selectedId, setSelectedId }}>
      <DragDropContext
        onBeforeDragStart={() => onBeforeDragStart(setDragStatus)}
        onDragEnd={(result) => onDragEnd(result, setDragStatus, eachModule, dispatch)}
      >
        {props.switchList ? <DailyList {...dailyProps} /> : <DailyCard {...dailyProps} />}
      </DragDropContext>
    </EveryDayContext.Provider>
  );
}

export default EveryDay;
