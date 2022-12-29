/*
 * @Description: 
 * @Author: Huang.zq
 * @Date: 2022-12-28 00:18:29
 * @LastEditors: Huang.zq
 * @LastEditTime: 2022-12-29 23:28:15
 */
import React, {useState} from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { SiderMenuContainer, Header, MenuBox, Info, OptionsBar } from './Styles';

export function SiderMenu(props:any) {
  const {getClose} = props
  const [colpased, setColpased] = useState(false)
  const triggle = () => {
    setColpased(!colpased)
    getClose(colpased)
  }
  return (
    <SiderMenuContainer>
      <Header>
        {colpased ? <MenuFoldOutlined onClick={() => triggle()} /> : <MenuUnfoldOutlined onClick={() => triggle()} />}
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
