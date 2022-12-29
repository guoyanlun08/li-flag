/*
 * @Description: 
 * @Author: Huang.zq
 * @Date: 2022-12-28 00:18:29
 * @LastEditors: Huang.zq
 * @LastEditTime: 2022-12-29 23:26:20
 */
import React, {useState} from 'react';
import { Layout } from 'antd';

import { SiderMenu } from './views/SiderMenu';
import { ToolsBar } from './views/ToolsBar';
import { EveryDay } from './views/EveryDay';

const { Sider, Header, Content } = Layout;

function App() {
  const [close, setClose] = useState(true)
  const getClose = (isClose:boolean) => {
    setClose(isClose)
  }
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider collapsed={close}>
        <SiderMenu getClose={getClose} />
      </Sider>
      <Layout>
        <Header style={{ background: '#c3aed6' }}>
          <ToolsBar />
        </Header>
        <Content>
          <EveryDay />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
