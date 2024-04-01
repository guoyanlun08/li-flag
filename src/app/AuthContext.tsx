// 登录上下文
import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { useAppDispatch } from './hooks';
import { getUserInfoThunk } from '@/features/user/userSlice';
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
  const dispatch = useAppDispatch();
  const [isLogin, setLogin] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  // XXX: 目前自行清除 localStorage 无法改变 isLogin 状态
  useEffect(() => {
    const loginInitInfo = async () => {
      setLogin(true);
      await dispatch(getUserInfoThunk());
    };

    if (getToken()) {
      loginInitInfo();
    } else {
      setLogin(false);
    }
  }, [isLogin]);

  /** 打开登录弹窗 */
  const openLoginModal = () => {
    // 实现登录逻辑，例如发送请求到后端验证用户
    setLoginVisible(true);
  };

  /** 登录操作 */
  const handleLogin = (res: any) => {
    setToken(res.token);
    setLogin(true);
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
