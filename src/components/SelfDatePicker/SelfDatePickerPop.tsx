import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, message, Tooltip } from 'antd';
import dayjs from 'dayjs';

import IconFont from '@/components/iconFont';
import useItemOperation from '@/components/ListItem/useItemOperation';

import { Styled_SelfDatePickerPop } from './Styles';

type SelfDatePickerPopProps = {
  todoId: number;
  startTime: number;
  endTime: number;
  coordinate: { x: number; y: number };
  changeVisible: (val: boolean) => void;
};

export const SelfDatePickerPop = (props: SelfDatePickerPopProps) => {
  const { todoId, startTime, endTime, coordinate, changeVisible } = props;

  const { getTodoList, updateTodoItem, getDelayTodoList } = useItemOperation();

  // TODO: 这里应处理为 非受控
  const [pickStartTime, setPickStartTime] = useState(dayjs(startTime));
  const [pickEndTime, setPickEndTime] = useState(dayjs(endTime));
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
    const dataStartTime = pickStartTime.valueOf();
    const dataEndTime = pickEndTime.valueOf();

    if (!dataStartTime || !dataEndTime) {
      return message.error('需补充时间段');
    }

    const data = {
      id: todoId,
      startTime: dataStartTime,
      endTime: dataEndTime
    };

    const hadUpdated = await updateTodoItem(data);
    changeVisible(false);

    // 先关掉弹窗一段时间，再刷新数据
    setTimeout(() => {
      getTodoList();
      getDelayTodoList();
    }, 200);
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
              defaultValue={pickStartTime}
              value={pickStartTime}
              maxDate={pickEndTime}
              onChange={(date) => setPickStartTime(date)}
              getPopupContainer={() => datePickerPopRef.current!}
            />
          </div>
        </div>
        <div className="date-pop-item">
          <div>结束</div>
          <div className="date-pop-antd-date">
            <DatePicker
              defaultValue={pickEndTime}
              value={pickEndTime}
              minDate={pickStartTime}
              onChange={(date) => setPickEndTime(date)}
              getPopupContainer={() => datePickerPopRef.current!}
            />
          </div>
        </div>
        <div className="date-pop-item date-quick-icon">
          <Tooltip placement="top" title="今天">
            <IconFont
              name="icon-jintian"
              style={{ fontSize: '20px' }}
              onClick={() => {
                setPickStartTime(dayjs().startOf('day'));
                setPickEndTime(dayjs().endOf('day'));
              }}
            />
          </Tooltip>
          <Tooltip placement="top" title="明天">
            <IconFont
              name="icon-mingtian"
              style={{ fontSize: '20px' }}
              onClick={() => {
                setPickStartTime(dayjs().add(1, 'day').startOf('day'));
                setPickEndTime(dayjs().add(1, 'day').endOf('day'));
              }}
            />
          </Tooltip>
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
