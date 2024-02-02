import React from 'react';

import { Theme, Condition, List } from './comp';
import { Styled_Container } from './Styles';

/** 近期完成模块 */
function RecentlyCompleted() {
  return (
    <Styled_Container>
      <Theme />
      <Condition />
      <List />
    </Styled_Container>
  );
}

export default RecentlyCompleted;
