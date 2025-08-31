import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import SiderMenu from '@/views/SiderMenu';
import mainColor from '@/styles/variables.module.scss';
import { THEME_KEY, ThemeMode } from '@/constants/theme';

const { Sider, Content } = Layout;
function doTransition() {
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle('dark');
  });
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        opacity: [1, 0]
      },
      {
        duration: 300,
        pseudoElement: '::view-transition-old(root)',
        easing: 'ease-out'
      }
    );
    document.documentElement.animate(
      {
        opacity: [0, 1]
      },
      {
        duration: 300,
        pseudoElement: '::view-transition-new(root)',
        easing: 'ease-in'
      }
    );
  });
}

function App() {
  const [close, setClose] = useState(true);
  const expAndCloseMenu = (isClose: boolean) => {
    setClose(isClose);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) ?? ThemeMode.light;
    if (savedTheme === ThemeMode.dark) {
      document.documentElement.classList.add(ThemeMode.dark);
    } else {
      document.documentElement.classList.remove(ThemeMode.dark);
    }
  }, []);
  const toggleDarkTheme = (mode: ThemeMode) => {
    localStorage.setItem(THEME_KEY, mode);
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
