import React from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';

import { SiderMenuContainer, Header, MenuBox, Info, OptionsBar } from './Styles';

export function SiderMenu() {
  return (
    <SiderMenuContainer>
      <Header>
        <MenuFoldOutlined />
      </Header>

      <MenuBox>
        <Info>
          <div className="info-avatar"></div>
          <div className="info-name">立 Flag</div>
        </Info>
        <OptionsBar>
          <div>每日计划</div>
          <div>option2</div>
          <div>option3</div>
        </OptionsBar>
      </MenuBox>
    </SiderMenuContainer>
  );
}
