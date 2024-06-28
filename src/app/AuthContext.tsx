// 登录上下文
import React, { ReactNode, createContext, useEffect, useState } from 'react';

import { useAppDispatch } from './hooks';
import { getUserInfo } from '@/apis/user';
import { setUserInfo, initUserInfo } from '@/features/user/userSlice';
import { getToken, setToken, removeToken } from '@/utils/localStorage';

import LoginModal from '@/components/Login';

type AuthContextType = {
  isLogin: boolean;
  openLoginModal: () => void;
  handleLogin: (token: string) => Promise<void>;
  handleLogOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  openLoginModal: function (): void {
    throw new Error('Function not implemented.');
  },
  handleLogin: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  handleLogOut: function (): Promise<void> {
    throw new Error('Function not implemented.');
  }
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isLogin, setLogin] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  // 设置登录用户信息
  const loginInitInfo = async () => {
    const { userInfo } = await getUserInfo();
    if (userInfo) {
      dispatch(setUserInfo({ userInfo }));
      setLogin(true);
    }
  };

  useEffect(() => {
    if (getToken()) {
      loginInitInfo();
    }
  }, []);

  /** 打开登录弹窗 */
  const openLoginModal = () => {
    // 实现登录逻辑，例如发送请求到后端验证用户
    setLoginVisible(true);
  };

  /** 登录操作 */
  const handleLogin = async (res: any) => {
    setToken(res.token);
    await loginInitInfo();
  };

  /** 登出操作 */
  const handleLogOut = () => {
    dispatch(initUserInfo());
    setLogin(false);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ isLogin, openLoginModal, handleLogin, handleLogOut }}>
      {children}
      <LoginModal
        open={loginVisible}
        onLoginFinish={(visible) => setLoginVisible(visible)}
        onCancel={() => setLoginVisible(false)}></LoginModal>
    </AuthContext.Provider>
  );
};
