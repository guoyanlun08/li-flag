import React from 'react';

import { ThemeBox, ConditionBox, ListBox } from './comp';
import { Styled_Container } from './Styles';

/** 近期完成模块 */
function RecentlyCompleted() {
  return (
    <Styled_Container>
      <ThemeBox />
      <ConditionBox />
      <ListBox />
    </Styled_Container>
  );
}

export default RecentlyCompleted;
