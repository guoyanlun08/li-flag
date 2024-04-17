import React from 'react';

import { ModuleFields } from '@/features/todo/todoSlice';

import { Styled_EveryDayContainer, Styled_CoordinateSystem } from './Styles';
import { EachCard } from './EachCard';
import { DailyPropsType } from '../EveryDay';

function DailyCard(props: DailyPropsType) {
  // 模块顺序
  const MODULE_ORDER = [
    ModuleFields.IMPORTANT_NOT_URGENT,
    ModuleFields.IMPORTANT_URGENT,
    ModuleFields.NOT_IMPORTANT_NOT_URGENT,
    ModuleFields.NOT_IMPORTANT_URGENT
  ];
  return (
    <Styled_EveryDayContainer>
      {MODULE_ORDER.map((module: string, index: number) => {
        const item = props.eachModule[module];
        return <EachCard key={item.moduleId} index={index} item={item} />;
      })}
      <Styled_CoordinateSystem>
        <div className="axis x-axis">
          <div className="axis-arrow x-arrow" />
          <div className="axis-name x-name">紧急</div>
        </div>
        <div className="axis y-axis">
          <div className="axis-arrow y-arrow" />
          <div className="axis-name y-name">重要</div>
        </div>
      </Styled_CoordinateSystem>
    </Styled_EveryDayContainer>
  );
}

export default DailyCard;
