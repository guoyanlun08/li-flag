import React from 'react';

import { EveryDayContainer } from './Styles';
import { EachCard } from './EachCard';

function DailyCard(props: any) {
  return (
    <EveryDayContainer>
      {props.eachModuleOrder.map((module: string) => {
        const item = props.eachModule[module];
        return <EachCard key={item.moduleId} {...item} />;
      })}
    </EveryDayContainer>
  );
}

export default DailyCard;
