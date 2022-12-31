import React, { useState } from 'react';

import variables from '@/styles/variables.module.scss';

import { EveryDayContainer } from './Styles';
import { EachModule } from './EachModule';

const eachModuleData = [
  {
    title: 'A',
    bgColor: variables.mainRed
  },
  {
    title: 'B',
    bgColor: variables.mainBlue
  },
  {
    title: 'C',
    bgColor: variables.mainGreen
  },
  {
    title: 'D',
    bgColor: variables.mainGray
  }
];

export function EveryDay() {
  const [selectedId, setSelectedId] = useState<number>(-1); // todo: 需要修改为number

  return (
    <EveryDayContainer>
      {eachModuleData.map((item) => {
        return (
          <EachModule key={item.title} bgColor={item.bgColor} title={item.title} selectedId={selectedId} setSelectedId={setSelectedId} />
        );
      })}
    </EveryDayContainer>
  );
}
