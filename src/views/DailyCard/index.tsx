import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { EveryDayContainer } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';

import { EachCard } from './EachCard';
import Tooltip from '@/components/ListItem/Tooltip';

let tooltipWidth = 0;
let tooltipHeight = 0;

function DailyCard() {
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const [dragStatus, setDragStatus] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipLeft, setTooltipLeft] = useState(0);
  const [tooltipTop, setTooltipTop] = useState(0);

  useEffect(() => {
    let frist_time = true;

    const selectionMouseUpEvent = () => {
      const sel = document.getSelection();
      if (!sel?.toString()) {
        return;
      }
      setShowTooltip(true);
      const range = sel?.getRangeAt(0);
      const { left, top, width: rangeWidth } = range.getBoundingClientRect();

      const offsetWidth = left + rangeWidth / 2 - tooltipWidth / 2;
      const offsetTop = top - tooltipHeight - 5;

      setTooltipLeft(offsetWidth);
      setTooltipTop(offsetTop);
    };

    const selectionchangeEvent = () => {
      setShowTooltip(false);
      if (frist_time) {
        frist_time = false;
        document.addEventListener('mouseup', selectionMouseUpEvent);
      }
    };
    // todo: getEventListeners(document) 好像被监听了两次？？？
    document.addEventListener('selectionchange', selectionchangeEvent);
    return () => {
      document.removeEventListener('mouseup', selectionMouseUpEvent);
      document.removeEventListener('selectionchange', selectionchangeEvent);
    };
  }, []);

  const getTooltipBounding = (width: number, height: number) => {
    tooltipWidth = width;
    tooltipHeight = height;
  };

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
      <Tooltip showTooltip={showTooltip} left={tooltipLeft} top={tooltipTop} getTooltipBounding={getTooltipBounding} />
    </DragDropContext>
  );
}

export default DailyCard;
