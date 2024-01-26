import React, { useState } from 'react';
import { Layout } from 'antd';

import SiderMenu from '@/views/SiderMenu';
import ToolsBar from '@/views/ToolsBar';
import EveryDay from '@/views/EveryDay';

const { Sider, Header, Content } = Layout;

function App() {
  const [close, setClose] = useState(true);
  const [switchList, setSwitchList] = useState(false);
  // todo: 建议修改函数名, 本意是去 折叠、展开
  const getClose = (isClose: boolean) => {
    setClose(isClose);
  };
  // todo: 建议修改函数名, 本意是去切换 list 和 card 状态
  const getSwitch = (isList: boolean) => {
    setSwitchList(isList);
  };
  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider collapsed={close}>
        <SiderMenu getClose={getClose} />
      </Sider>
      <Layout>
        <Header style={{ background: 'white' }}>
          <ToolsBar getSwitch={getSwitch} />
        </Header>
        <Content className="hiddenScroll" style={{ margin: '10px' }}>
          <EveryDay switchList={switchList} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
