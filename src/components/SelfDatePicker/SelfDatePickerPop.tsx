import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';

import { Styled_SelfDatePickerPop } from './Styles';
import useItemOperation from '@/components/ListItem/useItemOperation';

type SelfDatePickerPopProps = {
  todoId: number;
  startTime: string;
  endTime: string;
  coordinate: { x: number; y: number };
  changeVisible: (val: boolean) => void;
};

export const SelfDatePickerPop = (props: SelfDatePickerPopProps) => {
  const { todoId, startTime, endTime, coordinate, changeVisible } = props;

  const { getTodoList, updateTodoItem } = useItemOperation();

  const [pickStartTime, setPickStartTime] = useState(startTime);
  const [pickEndTime, setPickEndTime] = useState(endTime);
  const datePickerPopRef = useRef<HTMLDivElement>(null);

  // 关闭 datePickerPop 事件监听
  const closeDatePickerPop = (e: MouseEvent) => {
    if (!(datePickerPopRef.current && datePickerPopRef.current.contains(e.target as Node))) {
      // 点击弹窗外，则关闭弹窗
      changeVisible(false);
    }
  };

  // 确认 todoItem startTime, endTime
  const confirmDate = async () => {
    const data = {
      id: todoId,
      startTime: pickStartTime,
      endTime: pickEndTime
    };
    const hadUpdated = await updateTodoItem(data);
    await getTodoList({});

    changeVisible(false);
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
            <DatePicker
              onChange={(date) => setPickStartTime(date.format())}
              defaultValue={dayjs(startTime, 'YYYY-MM-DD')}
              getPopupContainer={() => datePickerPopRef.current!}
            />
          </div>
        </div>
        <div className="date-pop-item">
          <div>结束</div>
          <div className="date-pop-antd-date">
            <DatePicker
              onChange={(date) => setPickEndTime(date.format())}
              defaultValue={dayjs(endTime, 'YYYY-MM-DD')}
              getPopupContainer={() => datePickerPopRef.current!}
            />
          </div>
        </div>
      </div>
      <div className="date-pop-footer">
        <Button type="primary" size="small" onClick={confirmDate}>
          确 认
        </Button>
      </div>
    </Styled_SelfDatePickerPop>
  );
};
