import React, { useState } from 'react';

import { Theme, Condition, CompletedList } from './comp';
import { Styled_Container } from './Styles';

export type recentFormType = {
  recentDays: number;
  skipPage: boolean;
  includeToday: boolean;
};

/** 近期完成模块 */
function RecentlyCompleted() {
  const [isToday, setIsToday] = useState(false);

  // recentComplete
  const [recentForm, setRecentForm] = useState({
    recentDays: 7,
    skipPage: false,
    includeToday: false
  });

  return (
    <Styled_Container>
      <Theme day={recentForm.recentDays} />
      <Condition form={recentForm} setForm={setRecentForm} />
      <CompletedList />
    </Styled_Container>
  );
}

export default RecentlyCompleted;
