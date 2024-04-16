import React from 'react';

import { Styled_EveryDayContainer } from './Styles';
import { EachCard } from './EachCard';
import { DailyPropsType } from '../EveryDay';

function DailyCard(props: DailyPropsType) {
  return (
    <Styled_EveryDayContainer>
      {props.eachModuleOrder.map((module: string) => {
        const item = props.eachModule[module];
        return <EachCard key={item.moduleId} item={item} />;
      })}
    </Styled_EveryDayContainer>
  );
}

export default DailyCard;
