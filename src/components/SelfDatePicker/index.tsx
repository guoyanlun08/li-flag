import { DatePicker, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { Styled_SelfDatePicker } from './Styles';
import dayjs from 'dayjs';

type SelfDatePickProps = {
  visible: boolean;
  setVisible: (val: boolean) => void;
};

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

// 将其设置成一个弹窗，有日期选择，和时间段选择
export const SelfDatePicker = (props: SelfDatePickProps) => {
  const { visible, setVisible } = props;
  const [isDate, setIsDate] = useState(true);

  // 点击日期 tab 触发
  const clickCalendar = () => {
    setIsDate(true);
  };

  // 点击时间段 tab 触发
  const clickTimePeriod = () => {
    setIsDate(false);
  };

  // 点击确认日期、时间段触发
  const handleConfirmDate = () => {
    console.log('====');

    setVisible(false);
  };

  return visible ? (
    <Styled_SelfDatePicker isDate={isDate}>
      <div className="date-tab">
        <div className={`date-tab-box ${isDate ? 'date-tab-active' : ''}`} onClick={clickCalendar}>
          <div className="date-tab-text">日期</div>
        </div>
        <div className={`date-tab-box ${isDate ? '' : 'date-tab-active'}`} onClick={clickTimePeriod}>
          <div className="date-tab-text">时间段</div>
        </div>
      </div>
      {/* 日期选择 */}
      <DatePicker open={isDate} needConfirm onChange={(date, dateString) => handleConfirmDate()} />
      {/* 时间段选择 */}
      <RangePicker
        open={!isDate}
        defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
        format={dateFormat}
        // onCalendarChange={(dates, dateStrings) => console.log('9999', dates, dateStrings)}
        // needConfirm
        // onChange={(date, dateString) => console.log('+++', date, dateString)}
        // renderExtraFooter={(e) => (
        //   <Button type="primary" size="small" onClick={() => console.log(e)}>
        //     确 认
        //   </Button>
        // )}
      />
    </Styled_SelfDatePicker>
  ) : null;
};
