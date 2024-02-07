import React, { useState } from 'react';

import { Styled_NavTools, Styled_NavToolItem } from './Styles';

function NavTools(props: any) {
  const { getSwitch } = props;
  const [showList, setShowList] = useState(true);
  function switchToList() {
    setShowList(!showList);
    getSwitch(showList);
  }
  return (
    <Styled_NavTools>
      <div style={{ display: 'flex' }}>
        {/* 将来会是个循环 */}
        <Styled_NavToolItem onClick={() => switchToList()}>{showList ? 'List Mode' : 'Card Mode'}</Styled_NavToolItem>
      </div>
    </Styled_NavTools>
  );
}

export default NavTools;
