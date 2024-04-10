import React from 'react';
import { Outlet } from 'react-router-dom';

import NavTools from './NavTools';
import { Styled_EveryDayOutlet } from './Styles';

function EveryDayOutlet() {
  return (
    <Styled_EveryDayOutlet>
      <div className="nav-tools">
        <NavTools />
      </div>
      <div className="everyday-outlet">
        <Outlet></Outlet>
      </div>
    </Styled_EveryDayOutlet>
  );
}

export default EveryDayOutlet;
