import React from 'react';

import DailyCard from '@/views/DailyCard';
import DailyList from '@/views/DailyList';

interface propsType {
  switchList: boolean;
}

function EveryDay(props: propsType) {
  return <>{props.switchList ? <DailyList /> : <DailyCard />}</>;
}

export default EveryDay;
