import React, { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import IconFont from '@/components/iconFont';
import { SiderMenuContainer, Header, MenuBox, Info, OptionsBar, LoginBox } from './Styles';

function OptionItem(props: any) {
  return (
    <div onClick={(e) => {e.stopPropagation();console.log(props.title)}}>
        <IconFont name={props.icon} style={{ fontSize: '30px' }}/>
        <span className='menuItemText'>{props.title}</span>
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
  const triggle = ():void => {
    setColpased(!colpased);
    getClose(colpased);
  };
  const showLoginDialog = (e:any):void => {
    e.stopPropagation(); 
    setLoginVisible(true);
  }
  return (
    <>
      <SiderMenuContainer onClick={triggle}>
        <Header fold={colpased}>
          <span>Li-FLAG</span>
        </Header>
        <MenuBox>
          <Info fold={colpased}>
            <div className="info-avatar" onClick={(e) => showLoginDialog(e)}>
              <img src={require('../../assets/imgs/1_user5.png')} alt="" />
            </div>
            <div className="info-name">FlagUser</div>
          </Info>
          <OptionsBar fold={colpased}>
            {devData.map((item, index) => {
              return <OptionItem icon={item.icon} title={item.title} key={item.title + String(index)} />;
            })}
          </OptionsBar>
        </MenuBox>
        <div className="side-footer">
          {colpased ? <MenuOutlined /> : <MenuOutlined rotate={90} />}
        </div>
      </SiderMenuContainer>
      <Modal
        style={{ top: 100 }}
        width={600}
        maskClosable={false}
        footer={false}
        open={loginVisible}
        onCancel={() => setLoginVisible(false)}
      >
        <LoginBox>
          
        </LoginBox>
      </Modal>
    </>
  );
}

export default SiderMenu;
