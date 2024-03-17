import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Styled_NavTools, Styled_NavToolItem } from './Styles';

function NavTools(props: any) {
  const navigate = useNavigate();

  const [showList, setShowList] = useState(true);
  function switchToList() {
    setShowList(!showList);

    if (showList) {
      navigate('/everyday?list=true');
    } else {
      navigate('/everyday');
    }
  }
  return (
    <Styled_NavTools>
      <div style={{ display: 'flex' }}>
        <Styled_NavToolItem onClick={() => switchToList()}>{showList ? 'List Mode' : 'Card Mode'}</Styled_NavToolItem>
        <Styled_NavToolItem onClick={() => navigate('/recent-completed')}>RecentlyCompleted</Styled_NavToolItem>
      </div>
    </Styled_NavTools>
  );
}

export default NavTools;
