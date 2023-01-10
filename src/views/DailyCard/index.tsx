import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { EveryDayContainer } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';

import { EachCard } from './EachCard';

function DailyCard() {
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const [dragStatus, setDragStatus] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(-1);

  return (
    <DragDropContext
      onBeforeDragStart={() => onBeforeDragStart(setDragStatus)}
      onDragEnd={(result) => onDragEnd(result, setDragStatus, eachModule, dispatch)}>
      <EveryDayContainer>
        {eachModuleOrder.map((module) => {
          const item = eachModule[module];
          return <EachCard key={item.title} {...item} dragStatus={dragStatus} selectedId={selectedId} setSelectedId={setSelectedId} />;
        })}
      </EveryDayContainer>
    </DragDropContext>
  );
}

export default DailyCard;
