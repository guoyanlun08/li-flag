import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Collapse } from 'antd';

import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';

import { EachList } from './EachList';

const { Panel } = Collapse;

function DailyList() {
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const [dragStatus, setDragStatus] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(-1);

  return (
    <DragDropContext
      onBeforeDragStart={() => onBeforeDragStart(setDragStatus)}
      onDragEnd={(result) => onDragEnd(result, setDragStatus, eachModule, dispatch)}>
      <Collapse>
        {eachModuleOrder.map((module) => {
          const item = eachModule[module];
          return (
            <Panel header={item.title} key={item.title}>
              <EachList key={item.title} {...item} dragStatus={dragStatus} selectedId={selectedId} setSelectedId={setSelectedId} />
            </Panel>
          );
        })}
      </Collapse>
    </DragDropContext>
  );
}

export default DailyList;
