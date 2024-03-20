// 登录上下文
import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { getToken, setToken } from '@/utils/localStorage';

import LoginModal from '@/components/Login';

type AuthContextType = {
  isLogin: boolean;
  openLoginModal: () => void;
  handleLogin: (token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  openLoginModal: function (): void {
    throw new Error('Function not implemented.');
  },
  handleLogin: function (): void {
    throw new Error('Function not implemented.');
  }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setLogin] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  // TODO: 先完善 httpRequest.ts 再看看 setLogin(false)应该什么时候执行
  useEffect(() => {
    if (getToken()) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  /** 打开登录弹窗 */
  const openLoginModal = () => {
    // 实现登录逻辑，例如发送请求到后端验证用户
    setLoginVisible(true);
  };

  /** 登录操作 */
  const handleLogin = (token: string) => {
    setLogin(true);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ isLogin, openLoginModal, handleLogin }}>
      {children}
      <LoginModal
        open={loginVisible}
        onLoginFinish={(visible) => setLoginVisible(visible)}
        onCancel={() => setLoginVisible(false)}></LoginModal>
    </AuthContext.Provider>
  );
};
