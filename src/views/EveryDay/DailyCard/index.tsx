import React from 'react';

import { ModuleFields } from '@/features/todo/todoSlice';

import { Styled_EveryDayContainer } from './Styles';
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
      {MODULE_ORDER.map((module: string) => {
        const item = props.eachModule[module];
        return <EachCard key={item.moduleId} item={item} />;
      })}
    </Styled_EveryDayContainer>
  );
}

export default DailyCard;
