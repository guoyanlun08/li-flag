import React from 'react';

import variables from '@/styles/variables.module.scss';

import { EveryDayContainer } from './Styles';
import { EachModule } from './EachModule';

export function EveryDay() {
  return (
    <EveryDayContainer>
      <EachModule bgColor={variables.mainRed} />
    </EveryDayContainer>
  );
}
