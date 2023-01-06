import React, {useState} from 'react';

import { ToolBarContainer, ToolItem } from './Styles';

export function ToolsBar(props:any) {
  const {getSwitch} = props
  const [showList, setShowList] = useState(true)
  function switchToList(){
    setShowList(!showList)
    getSwitch(showList)
  }
  return (
    <ToolBarContainer>
      <div style={{ display: 'flex' }}>
        {/* 将来会是个循环 */}
        <ToolItem onClick={()=>switchToList()}>{showList? 'List Mode': 'Card Mode'}</ToolItem>
      </div>
    </ToolBarContainer>
  );
}
