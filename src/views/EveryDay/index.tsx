import React, { useState } from 'react';

import DailyCard from './DailyCard';
import DailyList from './DailyList';

interface propsType {
  switchList: boolean;
}

interface IEveryDayContext {
  dragStatus: boolean;
  selectedId: number;
  setDragStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
}

export const EveryDayContext = React.createContext<IEveryDayContext>({} as any);

function EveryDay(props: propsType) {
  const [dragStatus, setDragStatus] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(-1);

  return (
    <EveryDayContext.Provider value={{ dragStatus, setDragStatus, selectedId, setSelectedId }}>
      {props.switchList ? <DailyList /> : <DailyCard />}
    </EveryDayContext.Provider>
  );
}

export default EveryDay;
