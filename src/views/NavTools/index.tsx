import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Styled_NavTools, Styled_NavToolItem } from './Styles';

const navToolList = [
  {
    name: '卡片形式',
    path: '/everyday'
  },
  {
    name: '列表形式',
    path: '/everyday?listMode=true'
  },
  {
    name: '近期完成',
    path: '/recent-completed'
  }
];

function NavTools() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  return (
    <Styled_NavTools>
      <div style={{ display: 'flex' }}>
        {navToolList.map((navToolItem) => {
          return (
            <Styled_NavToolItem
              active={`${pathname}${search}` === navToolItem.path}
              key={navToolItem.path}
              onClick={() => navigate(navToolItem.path)}>
              {navToolItem.name}
            </Styled_NavToolItem>
          );
        })}
      </div>
    </Styled_NavTools>
  );
}

export default NavTools;
