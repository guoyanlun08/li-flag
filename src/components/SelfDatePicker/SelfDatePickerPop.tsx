import React, { useEffect, useRef } from 'react';
import { Button, DatePicker } from 'antd';

import { Styled_SelfDatePickerPop } from './Styles';

type SelfDatePickerPopProps = {
  coordinate: { x: number; y: number };
  changeVisible: (val: boolean) => void;
};

export const SelfDatePickerPop = (props: SelfDatePickerPopProps) => {
  const { coordinate, changeVisible } = props;

  const datePickerPopRef = useRef<HTMLDivElement>(null);

  // 关闭 datePickerPop 事件监听
  const closeDatePickerPop = (e: MouseEvent) => {
    if (!(datePickerPopRef.current && datePickerPopRef.current.contains(e.target as Node))) {
      // 点击弹窗外，则关闭弹窗
      changeVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDatePickerPop);

    return () => {
      document.removeEventListener('mousedown', closeDatePickerPop);
    };
  }, []);

  return (
    <Styled_SelfDatePickerPop coordinate={coordinate} ref={datePickerPopRef}>
      <div className="date-pop-tab">时间段</div>
      <div className="date-pop-content">
        <div className="date-pop-item">
          <div>开始</div>
          <div className="date-pop-antd-date">
            <DatePicker getPopupContainer={() => datePickerPopRef.current!} />
          </div>
        </div>
        <div className="date-pop-item">
          <div>结束</div>
          <div className="date-pop-antd-date">
            <DatePicker getPopupContainer={() => datePickerPopRef.current!} />
          </div>
        </div>
      </div>
      <div className="date-pop-footer">
        <Button type="primary" size="small">
          确 认
        </Button>
      </div>
    </Styled_SelfDatePickerPop>
  );
};
