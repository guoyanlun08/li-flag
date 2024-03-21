import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import moment from 'moment';

import SiderMenu from '@/views/SiderMenu';
import NavTools from '@/views/NavTools';

const { Sider, Header, Content } = Layout;

function App() {
  const [close, setClose] = useState(true);
  const expAndCloseMenu = (isClose: boolean) => {
    setClose(isClose);
  };

  // XXX：晚上 12点都会强制刷新，目前是强制的。后期这个需求再整理。
  useEffect(() => {
    const now = moment().valueOf();
    const endOfDay = moment().endOf('day').valueOf() + 1;

    setTimeout(() => {
      console.log('12点刷新页面，更新新一天数据');
      window.location.reload();
    }, endOfDay - now);
  }, []);

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider collapsed={close}>
        <SiderMenu getClose={expAndCloseMenu} />
      </Sider>
      <Layout>
        <Header style={{ background: 'white' }}>
          <NavTools />
        </Header>
        <Content className="hiddenScroll" style={{ margin: '10px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
