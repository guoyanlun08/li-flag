import React from 'react';

import DailyCard from './DailyCard';
import DailyList from './DailyList';

interface propsType {
  switchList: boolean;
}

function EveryDay(props: propsType) {
  return <>{props.switchList ? <DailyList /> : <DailyCard />}</>;
}

export default EveryDay;
