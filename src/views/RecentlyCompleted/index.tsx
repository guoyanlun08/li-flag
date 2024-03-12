import React, { useState } from 'react';

import { Theme, Condition, CompletedList } from './comp';
import { Styled_Container } from './Styles';

/** 近期完成模块 */
function RecentlyCompleted() {
  const [isToday, setIsToday] = useState(false);

  // 是否用对象好点
  const [recentDays, setRecentDays] = useState(7);
  const [skipPage, setSkipPage] = useState(false);

  return (
    <Styled_Container>
      <Theme />
      <Condition />
      <CompletedList />
    </Styled_Container>
  );
}

export default RecentlyCompleted;
