import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import SiderMenu from '@/views/SiderMenu';
import mainColor from '@/styles/variables.module.scss';

const { Sider, Content } = Layout;
function doTransition() {
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle('dark');
  });
  transition.ready.then(() => {
    const x = 0,
      y = 0;
    const radius = Math.sqrt(Math.max(x, window.innerWidth - x) ** 2 + Math.max(y, window.innerHeight - y) ** 2);
    document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 300, pseudoElement: '::view-transition-new(root)' }
    );
  });
}

function App() {
  const [close, setClose] = useState(true);
  const expAndCloseMenu = (isClose: boolean) => {
    setClose(isClose);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkTheme');
    let darkTheme = savedTheme ? JSON.parse(savedTheme) : false;
    if (darkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  const toggleDarkTheme = (isDark: boolean) => {
    const newTheme = !isDark;
    // setDarkTheme(newTheme);
    localStorage.setItem('darkTheme', JSON.stringify(newTheme));
    doTransition();
  };

  return (
    <Layout style={{ width: '100%', height: '100%' }}>
      <Sider collapsed={close}>
        <SiderMenu getClose={expAndCloseMenu} toggleTheme={toggleDarkTheme} />
      </Sider>
      <Layout style={{ background: mainColor.primaryBgColor }}>
        <Content className="hiddenScroll" style={{ margin: '10px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
