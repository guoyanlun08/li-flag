import React, { useState } from 'react';
import { Layout } from 'antd';

import { SiderMenu } from './views/SiderMenu';
import { ToolsBar } from './views/ToolsBar';
import { EveryDay } from './views/EveryDay';

const { Sider, Header, Content } = Layout;

function App() {
  const [close, setClose] = useState(true);
  const getClose = (isClose: boolean) => {
    setClose(isClose);
  };
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider collapsed={close}>
        <SiderMenu getClose={getClose} />
      </Sider>
      <Layout>
        <Header style={{ background: 'white' }}>
          <ToolsBar />
        </Header>
        <Content style={{margin: '10px'}}>
          <EveryDay />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
