import React, { useEffect, useRef, useState, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { EveryDayContainer } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';

import { EveryDayContext } from '../index';
import { EachCard } from './EachCard';

function DailyCard() {
  const context = useContext(EveryDayContext);
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  return (
    <DragDropContext
      onBeforeDragStart={() => onBeforeDragStart(context.setDragStatus)}
      onDragEnd={(result) => onDragEnd(result, context.setDragStatus, eachModule, dispatch)}>
      <EveryDayContainer>
        {eachModuleOrder.map((module) => {
          const item = eachModule[module];
          return <EachCard key={item.title} {...item} />;
        })}
      </EveryDayContainer>
    </DragDropContext>
  );
}

export default DailyCard;
