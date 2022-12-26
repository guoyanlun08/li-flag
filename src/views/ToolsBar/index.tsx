import React from 'react';

import { ToolBarContainer, ToolItem } from './Styles';

export function ToolsBar() {
  return (
    <ToolBarContainer>
      <div style={{ display: 'flex' }}>
        {/* 将来会是个循环 */}
        <ToolItem>切换 list</ToolItem>
      </div>
    </ToolBarContainer>
  );
}
