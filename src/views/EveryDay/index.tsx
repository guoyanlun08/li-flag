import React from 'react';
import { Outlet } from 'react-router-dom';

import NavTools from './NavTools';
import { Styled_EveryDayOutlet } from './Styles';
import { SelfDatePicker } from '@/components/SelfDatePicker';

function EveryDayOutlet() {
  return (
    <Styled_EveryDayOutlet>
      <div className="nav-tools">
        <NavTools />
      </div>
      <div className="everyday-outlet">
        {/* <Outlet></Outlet> */}
        <SelfDatePicker />
      </div>
    </Styled_EveryDayOutlet>
  );
}

export default EveryDayOutlet;
