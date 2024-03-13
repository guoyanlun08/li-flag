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
  const titleRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  const handleSwapElement = () => {
    if (!titleRef || !todayRef) return;
    console.log(titleRef.current?.parentElement);
  };

  return (
    <Styled_Theme>
      <Styled_ThemeBox>
        <Styled_ThemeTitle ref={titleRef}>最近 {day} 天</Styled_ThemeTitle>
        <Styled_ThemeIcon>
          <IconFont
            name="icon-qiehuanxitong"
            rotate={45}
            style={{ fontSize: 80 }}
            onClick={() => {
              handleSwapElement();
              toggleIsToday(!isToday);
            }}
          />
        </Styled_ThemeIcon>
        <Styled_ThemeToday ref={todayRef}>今日已完成</Styled_ThemeToday>
      </Styled_ThemeBox>
    </Styled_Theme>
  );
}

export default Theme;
