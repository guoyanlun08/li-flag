import React from 'react';

import IconFont from '@/components/iconFont';
import { Styled_Theme, Styled_RencentTitle, Styled_SwitchIcon, Styled_TodayComplete } from '../Styles';

/** 近期模块 —— 主题 */
function ThemeBox() {
  return (
    <Styled_Theme>
      <Styled_RencentTitle>最近 x 天</Styled_RencentTitle>
      <Styled_SwitchIcon>
        <IconFont name="icon-qiehuanxitong" />
      </Styled_SwitchIcon>
      <Styled_TodayComplete>今日已完成</Styled_TodayComplete>
    </Styled_Theme>
  );
}

export default ThemeBox;
