import React, { useState, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Collapse } from 'antd';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';
import { EveryDayContext } from '../index';
import { EachList } from './EachList';

const { Panel } = Collapse;

function DailyList() {
  const context = useContext(EveryDayContext);
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  return (
    <DragDropContext
      onBeforeDragStart={() => onBeforeDragStart(context.setDragStatus)}
      onDragEnd={(result) => onDragEnd(result, context.setDragStatus, eachModule, dispatch)}>
      <Collapse>
        {eachModuleOrder.map((module) => {
          const item = eachModule[module];
          return (
            <Panel header={item.title} key={item.title}>
              <EachList key={item.title} {...item} />
            </Panel>
          );
        })}
      </Collapse>
    </DragDropContext>
  );
}

export default DailyList;
