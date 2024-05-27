// XXX: 看没有办法处理 弹出日历 点击 Styled_SelfDatePickerPop外的元素不会关闭 datePickerPop
import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { TodoListItemType } from '@/types/todoType';
import { SelfDatePickerPop } from './SelfDatePickerPop';
import { Styled_SelfDatePicker, DATE_PICKER_POP_WIDTH, DATE_PICKER_POP_HEIGHT } from './Styles';

type SelfDatePickerProps = {
  todoItem: TodoListItemType;
  completed: boolean;
};

export const SelfDatePicker = (props: SelfDatePickerProps) => {
  const {
    todoItem: { id, startTime, endTime },
    completed
  } = props;

  const [visible, setVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });

  // 处理 todoItem中 startTime, endTime 用于 .date-picker-title文本显示
  const dateTitle = useMemo(() => {
    const ds_startTime = dayjs(startTime);
    const ds_endTime = dayjs(endTime);

    if (ds_startTime.isSame(ds_endTime, 'day') && ds_startTime.isSame(dayjs(), 'day')) {
      // 是同一天 显示 今天
      return '今天';
    } else {
      // 其余之间显示时间段 MM-DD ~ MM-DD
      return `${ds_startTime.format('MM-DD')} ~ ${ds_endTime.format('MM-DD')}`;
    }
  }, [startTime, endTime]);

  // 点击选择 item 日期，打开 pop
  const clickDatePicker = (e: React.MouseEvent) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 已完成不能选择时间
    if (completed) return;

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

  // 弹出 选择时间的 pop 显示隐藏切换
  const changeVisible = (val: boolean) => {
    setVisible(val);
  };

  return (
    <Styled_SelfDatePicker completed={completed}>
      <div className="date-picker-title" onClick={(e) => clickDatePicker(e)}>
        {dateTitle}
      </div>
      {visible ? (
        <SelfDatePickerPop
          todoId={id}
          startTime={startTime}
          endTime={endTime}
          coordinate={coordinate}
          changeVisible={changeVisible}
        />
      ) : null}
    </Styled_SelfDatePicker>
  );
};
