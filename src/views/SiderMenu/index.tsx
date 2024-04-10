import React, { useContext, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext, useAppSelector } from '@/app/hooks';

import PersonalSettingsModal from '@/views/PersonalSettingsModal';
import IconFont from '@/components/iconFont';
import { Styled_SiderMenuContainer, Styled_Header, Styled_MenuBox, Styled_Info, Styled_OptionsBar } from './Styles';

type menuProps = {
  title: string;
  icon: string;
  path: string;
  active?: boolean;
};

function OptionItem(props: menuProps) {
  const navigate = useNavigate();

  return (
    <div
      className={props.active === true ? 'active' : ''}
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
    title: '首页',
    icon: 'icon-a-009_quanbugongneng',
    path: '/'
  },
  {
    title: '每日模块',
    icon: 'icon-a-009_wodedaiban',
    path: '/everyday'
  }
];

function SiderMenu(props: any) {
  const { getClose } = props;

  const userState = useAppSelector((store) => store.user);

  const { openLoginModal, isLogin } = useContext(AuthContext);

  const [personalSettingsVisible, setPersonalSettingsVisible] = useState(false); // 个人设置弹窗 visible
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  // 点击 siderMenu 触发
  const handleClickSiderMenu = (): void => {
    setCollapsed(!collapsed);
    getClose(collapsed);
  };

  // 个人设置弹窗 visible 的控制
  const triggerPersonalSettingsModal = (visible: boolean) => {
    setPersonalSettingsVisible(visible);
  };

  // 点击 头像触发。未登录，弹出登录框；已登录，弹出个人设置框；
  const handleClickAvatar = (e: any): void => {
    e.stopPropagation();
    if (!isLogin) {
      openLoginModal();
    } else {
      triggerPersonalSettingsModal(true);
    }
  };

  return (
    <>
      <Styled_SiderMenuContainer onClick={handleClickSiderMenu}>
        <Styled_Header fold={collapsed}>
          <span>Li-FLAG</span>
        </Styled_Header>
        <Styled_MenuBox>
          <Styled_Info fold={collapsed}>
            <div className="info-avatar" onClick={(e) => handleClickAvatar(e)}>
              <img src={userState.avatarPath ? userState.avatarPath : require('../../assets/imgs/1_user5.png')} alt="" />
            </div>
            <div className="info-name">{userState.nickName}</div>
          </Styled_Info>
          <Styled_OptionsBar fold={collapsed}>
            {menus.map((menu) => {
              return (
                <OptionItem
                  key={menu.title}
                  active={`/${pathname.split('/')[1]}` === menu.path}
                  icon={menu.icon}
                  title={menu.title}
                  path={menu.path}
                />
              );
            })}
          </Styled_OptionsBar>
        </Styled_MenuBox>
        <div className="side-footer">{collapsed ? <MenuOutlined /> : <MenuOutlined rotate={90} />}</div>
      </Styled_SiderMenuContainer>
      <PersonalSettingsModal visible={personalSettingsVisible} setOpen={triggerPersonalSettingsModal} />
    </>
  );
}

export default SiderMenu;
