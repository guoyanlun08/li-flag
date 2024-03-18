import React from 'react';

import IconFont from '@/components/iconFont';
import { Styled_Theme, Styled_ThemeBox, Styled_ThemeTitle, Styled_ThemeIcon, Styled_ThemeToday } from '../Styles';

type PropsType = {
  day: number;
  isToday: boolean;
  toggleIsToday: (val: boolean) => void;
};

/** 近期模块 —— 主题 */
function Theme(props: PropsType) {
  const { day, isToday, toggleIsToday } = props;

  const recentDayTitleDom = <Styled_ThemeTitle isToday={isToday}>最近 {day} 天</Styled_ThemeTitle>;
  const todayTitleDom = <Styled_ThemeToday isToday={isToday}>今日已完成</Styled_ThemeToday>;
  const IconStyle = {
    fontSize: 80,
    transition: 'transform 1s',
    transform: isToday ? 'rotate(180deg)' : 'none'
  };

  return (
    <Styled_Theme>
      <Styled_ThemeBox>
        {isToday ? todayTitleDom : recentDayTitleDom}
        <Styled_ThemeIcon>
          <IconFont name="icon-qiehuanxitong" rotate={45} style={IconStyle} onClick={() => toggleIsToday(!isToday)} />
        </Styled_ThemeIcon>
        <div style={{ alignSelf: 'end' }} onClick={() => toggleIsToday(!isToday)}>
          {isToday ? recentDayTitleDom : todayTitleDom}
        </div>
      </Styled_ThemeBox>
    </Styled_Theme>
  );
}

export default Theme;
