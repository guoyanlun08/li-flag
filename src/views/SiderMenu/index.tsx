import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { SiderMenuContainer, Header, MenuBox, Info, OptionsBar } from './Styles';

export function SiderMenu(props: any) {
  const { getClose } = props;
  const [colpased, setColpased] = useState(false);
  const triggle = () => {
    setColpased(!colpased);
    getClose(colpased);
  };
  return (
    <SiderMenuContainer>
      <Header>{colpased ? <MenuFoldOutlined onClick={() => triggle()} /> : <MenuUnfoldOutlined onClick={() => triggle()} />}</Header>

      <MenuBox>
        <Info>
          <div className="info-avatar"></div>
          <div className="info-name">立 Flag</div>
        </Info>
        <OptionsBar>
          <div><span>每日计划</span></div>
          <div><span>option2</span></div>
          <div><span>option3</span></div>
        </OptionsBar>
      </MenuBox>
    </SiderMenuContainer>
  );
}
