import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import IconFont from '@/components/iconFont';
import SocialLogin from './SocialLogin';
import { Styled_LoginBox } from '../Styles';
import { OperationType, LoginMode } from '../constants';

type PropsType = {
  switchOpType: (e: React.MouseEvent, type: OperationType) => void;
  loginHandle: (values: { userId: string; password: string }) => void;
};

const Login = (props: PropsType) => {
  const { switchOpType, loginHandle } = props;
  const [loginMode, setLoginMode] = useState<LoginMode>(LoginMode.ACCOUNT_AND_PHONE);

  // 切换登录类型
  const switchLoginMode = (loginType: LoginMode) => {
    setLoginMode(loginType);
  };

  return (
    <Styled_LoginBox active={loginMode}>
      <div className="pwd-login">
        {loginMode === 'accountAndPhone' ? (
          <div className="pwd-login-unfold">
            <Form name="normal_login" className="login-form" onFinish={loginHandle}>
              <Form.Item name="userId" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登入
                </Button>
              </Form.Item>
            </Form>
            <div className="user-pwd-foot">
              <div>
                <span>没有账号？</span>
                <a href="" className="register-btn" onClick={(e) => switchOpType(e, OperationType.REGISTER)}>
                  注册
                </a>
              </div>
              <div>
                <a href="">忘记密码？</a>
              </div>
            </div>
          </div>
        ) : (
          <div className="pwd-login-fold">
            <div onClick={() => switchLoginMode(LoginMode.ACCOUNT_AND_PHONE)}>
              <IconFont name="icon-mima1" style={{ fontSize: '30px' }} />
              <span>密码登录</span>
            </div>
            {/* todo: 手机登录还没做,暂时都显示密码登录 */}
            <div onClick={() => switchLoginMode(LoginMode.ACCOUNT_AND_PHONE)}>
              <IconFont name="icon-shouji" style={{ fontSize: '30px' }} />
              <span>手机登录</span>
            </div>
          </div>
        )}
      </div>
      <SocialLogin loginMode={loginMode} switchLoginMode={switchLoginMode} />
    </Styled_LoginBox>
  );
};

export default Login;
