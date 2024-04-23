// XXX: 看没有办法处理 弹出日历 点击 Styled_SelfDatePickerPop外的元素不会关闭 datePickerPop
import React, { useState } from 'react';

import { SelfDatePickerPop } from './SelfDatePickerPop';
import { Styled_SelfDatePicker, DATE_PICKER_POP_WIDTH, DATE_PICKER_POP_HEIGHT } from './Styles';

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

export const SelfDatePicker = () => {
  const [visible, setVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });

  // 点击选择 item 日期，打开 pop
  const clickDatePicker = (e: React.MouseEvent) => {
    const rect = (e.target as Element).getBoundingClientRect();
    let x, y;

    // 对 datePickerPop的位置设定
    if (rect.left < viewportWidth / 2) {
      x = rect.left - DATE_PICKER_POP_WIDTH / 2;
    } else {
      x = viewportWidth - DATE_PICKER_POP_WIDTH - 20;
    }

    if (rect.top + DATE_PICKER_POP_HEIGHT < viewportHeight) {
      y = rect.top + rect.height;
    } else {
      y = rect.top - DATE_PICKER_POP_HEIGHT - 10;
    }

    setCoordinate({ x, y });
    setVisible(true);
  };

  const changeVisible = (val: boolean) => {
    setVisible(val);
  };

  return (
    <Styled_SelfDatePicker>
      <div className="date-picker-title" onClick={(e) => clickDatePicker(e)}>
        日期选择
      </div>
      {visible ? <SelfDatePickerPop coordinate={coordinate} changeVisible={changeVisible} /> : null}
    </Styled_SelfDatePicker>
  );
};
