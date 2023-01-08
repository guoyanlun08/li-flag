import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';

import { SiderMenuContainer, Header, MenuBox, Info, OptionsBar } from './Styles';

function OptionItem(props: any) {
  return (
    <div>
      <span title={props.title}>{props.title}</span>
    </div>
  )
}
//dev mock data
const devData = [
  {
    title: '每日模块'
  },
  {
    title: 'Option1'
  },
  {
    title: 'Option2'
  },
]

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
        <span>Li-FLAG</span>
      </Header>
      <MenuBox>
        <Info fold={colpased}>
          <div className="info-avatar">
            <img src={require('../../assets/imgs/1_user5.png')} alt="" />
          </div>
          <div className="info-name">FlagUser</div>
        </Info>
        <OptionsBar>
          {devData.map((item) => {
            return <OptionItem title={item.title} />
          })}
        </OptionsBar>
      </MenuBox>
      <div className="side-footer" onClick={() => triggle()}>
        {colpased ? <MenuOutlined /> : <MenuOutlined rotate={90} />}
      </div>
    </SiderMenuContainer>
  );
}
