import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import IconFont from '@/components/iconFont';
import LoginModal from '@/components/Login';
import { Styled_SiderMenuContainer, Styled_Header, Styled_MenuBox, Styled_Info, Styled_OptionsBar } from './Styles';

function OptionItem(props: any) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        console.log(props.title);
      }}
    >
      <IconFont name={props.icon} style={{ fontSize: '30px' }} />
      <span className="menuItemText">{props.title}</span>
    </div>
  );
}
//dev mock data
const devData = [
  {
    title: '每日模块',
    icon: 'icon-a-009_wodedaiban'
  },
  {
    title: 'Option1',
    icon: 'icon-a-009_xinjianliucheng'
  },
  {
    title: 'Option2',
    icon: 'icon-a-009_wodericheng'
  }
];

function SiderMenu(props: any) {
  const { getClose } = props;
  const [colpased, setColpased] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const triggle = (): void => {
    setColpased(!colpased);
    getClose(colpased);
  };
  const showLoginDialog = (e: any): void => {
    e.stopPropagation();
    setLoginVisible(true);
  };
  return (
    <>
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
            {devData.map((item, index) => {
              return <OptionItem icon={item.icon} title={item.title} key={item.title + String(index)} />;
            })}
          </Styled_OptionsBar>
        </Styled_MenuBox>
        <div className="side-footer">{colpased ? <MenuOutlined /> : <MenuOutlined rotate={90} />}</div>
      </Styled_SiderMenuContainer>
      <LoginModal open={loginVisible} onCancel={() => setLoginVisible(false)}></LoginModal>
    </>
  );
}

export default SiderMenu;
