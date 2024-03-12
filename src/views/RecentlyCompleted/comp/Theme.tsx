import React from 'react';

import IconFont from '@/components/iconFont';
import { Styled_Theme, Styled_ThemeBox, Styled_ThemeTitle, Styled_ThemeIcon, Styled_ThemeToday } from '../Styles';

type propsType = {
  day: number;
};

/** 近期模块 —— 主题 */
function Theme(props: propsType) {
  const { day } = props;

  return (
    <Styled_Theme>
      <Styled_ThemeBox>
        <Styled_ThemeTitle>最近 {day} 天</Styled_ThemeTitle>
        <Styled_ThemeIcon>
          <IconFont name="icon-qiehuanxitong" style={{ fontSize: 80 }} />
        </Styled_ThemeIcon>
        <Styled_ThemeToday>今日已完成</Styled_ThemeToday>
      </Styled_ThemeBox>
    </Styled_Theme>
  );
}

export default Theme;
