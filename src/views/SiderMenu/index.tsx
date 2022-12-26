import React from 'react';
import style from './index.module.scss';
import { MenuFoldOutlined } from '@ant-design/icons';

export function SiderMenu() {
  return (
    <div className={style['sider-menu']}>
      <div className="header">
        <MenuFoldOutlined />
      </div>
      <div className="menu-box">
        <div className="info">
          <div className="info-avatar"></div>
          <div className="info-name">立 Flag</div>
        </div>
        <div className="options-bar">
          <div>每日计划</div>
          <div>option2</div>
          <div>option3</div>
        </div>
      </div>
    </div>
  );
}
