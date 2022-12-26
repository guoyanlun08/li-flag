import React from 'react';
import { Layout } from 'antd';

import { SiderMenu } from './views/SiderMenu';

const { Sider, Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider>
        <SiderMenu />
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
}

export default App;
