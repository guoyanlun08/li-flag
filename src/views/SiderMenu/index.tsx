import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';

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
      <Header fold={colpased}>
        <span style={{fontFamily: 'fantasy'}}>FLAG</span>
      </Header>
      <MenuBox>
        <Info fold={colpased}>
          <div className="info-avatar">
            <img src={require('../../assets/imgs/1_user5.png')} alt="" />
          </div>
          <div className="info-name">FlagUser</div>
        </Info>
        <OptionsBar>
          <div><span>每日计划</span></div>
          <div><span>option2</span></div>
          <div><span>option3</span></div>
        </OptionsBar>
      </MenuBox>
      <div className='side-footer' onClick={() => triggle()}>
        {colpased? <MenuOutlined />: <MenuOutlined rotate={90} />}
      </div>
    </SiderMenuContainer>
  );
}
