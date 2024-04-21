import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import NavTools from './NavTools';
import { Styled_EveryDayOutlet } from './Styles';
import { SelfDatePicker } from '@/components/SelfDatePicker';

function EveryDayOutlet() {
  // 日期选择器使用
  const [datePickerVisible, setDatePickerVisible] = useState(true);
  const toggleDatePickerVisible = (val: boolean) => {
    setDatePickerVisible(val);
  };

  return (
    <Styled_EveryDayOutlet>
      <div className="nav-tools">
        <NavTools />
      </div>
      <div className="everyday-outlet">
        {/* <Outlet></Outlet> */}
        <SelfDatePicker visible={datePickerVisible} setVisible={toggleDatePickerVisible} />
      </div>
    </Styled_EveryDayOutlet>
  );
}

export default EveryDayOutlet;
