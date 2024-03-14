import React, { useEffect, useRef, useState } from 'react';

import IconFont from '@/components/iconFont';
import { Styled_Theme, Styled_ThemeBox, Styled_ThemeTitle, Styled_ThemeIcon, Styled_ThemeToday } from '../Styles';

type propsType = {
  day: number;
  isToday: boolean;
  toggleIsToday: (val: boolean) => void;
};

/** 近期模块 —— 主题 */
function Theme(props: propsType) {
  const { day, isToday, toggleIsToday } = props;

  const recentDayTitleDom = <Styled_ThemeTitle isToday={isToday}>最近 {day} 天</Styled_ThemeTitle>;
  const todayTitleDom = <Styled_ThemeToday isToday={isToday}>今日已完成</Styled_ThemeToday>;

  return (
    <Styled_Theme>
      <Styled_ThemeBox>
        {isToday ? todayTitleDom : recentDayTitleDom}
        <Styled_ThemeIcon>
          <IconFont name="icon-qiehuanxitong" rotate={45} style={{ fontSize: 80 }} onClick={() => toggleIsToday(!isToday)} />
        </Styled_ThemeIcon>
        {isToday ? recentDayTitleDom : todayTitleDom}
      </Styled_ThemeBox>
    </Styled_Theme>
  );
}

export default Theme;
