import { DatePicker } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { Styled_SelfDatePicker } from './Styles';

type SelfDatePickProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

// 将其设置成一个弹窗，有日期选择，和时间段选择
export const SelfDatePicker = (props: SelfDatePickProps) => {
  const { open, setOpen } = props;

  return (
    <Styled_SelfDatePicker>
      <DatePicker
        open={open}
        onChange={() => {
          setOpen(false);
        }}
      />
    </Styled_SelfDatePicker>
  );
};
