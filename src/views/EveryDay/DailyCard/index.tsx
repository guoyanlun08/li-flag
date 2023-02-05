import React, { useEffect, useRef, useState, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { EveryDayContainer } from './Styles';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { onBeforeDragStart, onDragEnd } from '@/views/EveryDay/common';

import { EveryDayContext } from '../index';
import { EachCard } from './EachCard';
// import Tooltip from '@/components/ListItem/Tooltip';

function DailyCard() {
  const context = useContext(EveryDayContext);
  const { eachModule, eachModuleOrder } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  // 暂时关闭功能
  // const [showTooltip, setShowTooltip] = useState(false);
  // const [tooltipLeft, setTooltipLeft] = useState(0);
  // const [tooltipTop, setTooltipTop] = useState(0);
  // const tooltipRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   let frist_time = true;

  //   const selectionMouseUpEvent = () => {
  //     const sel = document.getSelection();
  //     if (!sel?.toString()) {
  //       return;
  //     }
  //     setShowTooltip(true);

  //     const range = sel?.getRangeAt(0);
  //     const { left, top, width: rangeWidth } = range.getBoundingClientRect();

  //     const offsetWidth = left + rangeWidth / 2 - tooltipRef.current!.offsetWidth / 2;
  //     const offsetTop = top - tooltipRef.current!.offsetHeight - 5;

  //     setTooltipLeft(offsetWidth);
  //     setTooltipTop(offsetTop);
  //   };

  //   const selectionchangeEvent = () => {
  //     if (frist_time) {
  //       frist_time = false;
  //       document.addEventListener('mouseup', selectionMouseUpEvent);
  //     }
  //   };
  //   // todo: getEventListeners(document) 好像被监听了两次？？？
  //   document.addEventListener('selectionchange', selectionchangeEvent);
  //   return () => {
  //     document.removeEventListener('mouseup', selectionMouseUpEvent);
  //     document.removeEventListener('selectionchange', selectionchangeEvent);
  //   };
  // }, []);

  // useEffect(() => {
  //   const documentClick = (e: any) => {
  //     if (tooltipRef.current) {
  //       if (!tooltipRef.current.contains(e.target)) {
  //         setShowTooltip(false);
  //       }
  //     }
  //   };

  //   document.addEventListener('mousedown', documentClick);
  //   return () => {
  //     document.removeEventListener('mousedown', documentClick);
  //   };
  // }, []);

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
      {/* todo: 暂时关闭功能 */}
      {/* <Tooltip ref={tooltipRef} showTooltip={showTooltip} left={tooltipLeft} top={tooltipTop} /> */}
    </DragDropContext>
  );
}

export default DailyCard;
