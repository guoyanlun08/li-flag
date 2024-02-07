import React, { useState } from 'react';
import { Layout } from 'antd';

import SiderMenu from '@/views/SiderMenu';
import NavTools from '@/views/NavTools';
import EveryDay from '@/views/EveryDay';

const { Sider, Header, Content } = Layout;

function App() {
  const [close, setClose] = useState(true);
  const [switchList, setSwitchList] = useState(false);
  const expAndCloseMenu = (isClose: boolean) => {
    setClose(isClose);
  };
  const switchToList = (isList: boolean) => {
    setSwitchList(isList);
  };
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider collapsed={close}>
        <SiderMenu getClose={expAndCloseMenu} />
      </Sider>
      <Layout>
        <Header style={{ background: 'white' }}>
          <NavTools getSwitch={switchToList} />
        </Header>
        <Content className="hiddenScroll" style={{ margin: '10px' }}>
          <EveryDay switchList={switchList} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
