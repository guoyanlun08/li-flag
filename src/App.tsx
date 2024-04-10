import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import SiderMenu from '@/views/SiderMenu';

const { Sider, Content } = Layout;

function App() {
  const [close, setClose] = useState(true);
  const expAndCloseMenu = (isClose: boolean) => {
    setClose(isClose);
  };

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider collapsed={close}>
        <SiderMenu getClose={expAndCloseMenu} />
      </Sider>
      <Layout>
        <Content className="hiddenScroll" style={{ margin: '10px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
