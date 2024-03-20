import React, { useContext, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '@/app/hooks';

import IconFont from '@/components/iconFont';
import { Styled_SiderMenuContainer, Styled_Header, Styled_MenuBox, Styled_Info, Styled_OptionsBar } from './Styles';

type menuProps = {
  title: string;
  icon: string;
  path: string;
};

function OptionItem(props: menuProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        navigate(`${props.path}`);
      }}>
      <IconFont name={props.icon} style={{ fontSize: '30px' }} />
      <span className="menuItemText">{props.title}</span>
    </div>
  );
}

// 左侧菜单
const menus: menuProps[] = [
  {
    title: '每日模块',
    icon: 'icon-a-009_wodedaiban',
    path: '/everyday'
  }
  // {
  //   title: 'Option1',
  //   icon: 'icon-a-009_xinjianliucheng',
  //   path: '/'
  // },
  // {
  //   title: 'Option2',
  //   icon: 'icon-a-009_wodericheng',
  //   path: '/'
  // }
];

function SiderMenu(props: any) {
  const { getClose } = props;
  const { openLoginModal, isLogin } = useContext(AuthContext);
  const [colpased, setColpased] = useState(false);
  const triggle = (): void => {
    setColpased(!colpased);
    getClose(colpased);
  };
  const showLoginDialog = (e: any): void => {
    e.stopPropagation();
    if (!isLogin) {
      openLoginModal();
    }
  };

  return (
    <Styled_SiderMenuContainer onClick={triggle}>
      <Styled_Header fold={colpased}>
        <span>Li-FLAG</span>
      </Styled_Header>
      <Styled_MenuBox>
        <Styled_Info fold={colpased}>
          <div className="info-avatar" onClick={(e) => showLoginDialog(e)}>
            <img src={require('../../assets/imgs/1_user5.png')} alt="" />
          </div>
          <div className="info-name">FlagUser</div>
        </Styled_Info>
        <Styled_OptionsBar fold={colpased}>
          {menus.map((menu) => {
            return <OptionItem key={menu.title} icon={menu.icon} title={menu.title} path={menu.path} />;
          })}
        </Styled_OptionsBar>
      </Styled_MenuBox>
      <div className="side-footer">{colpased ? <MenuOutlined /> : <MenuOutlined rotate={90} />}</div>
    </Styled_SiderMenuContainer>
  );
}

export default SiderMenu;
