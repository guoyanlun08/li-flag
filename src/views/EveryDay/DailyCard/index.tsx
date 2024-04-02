import React from 'react';

import { Styled_EveryDayContainer } from './Styles';
import { EachCard } from './EachCard';

function DailyCard(props: any) {
  return (
    <Styled_EveryDayContainer>
      {props.eachModuleOrder.map((module: string) => {
        const item = props.eachModule[module];
        return <EachCard key={item.moduleId} {...item} />;
      })}
    </Styled_EveryDayContainer>
  );
}

export default DailyCard;
