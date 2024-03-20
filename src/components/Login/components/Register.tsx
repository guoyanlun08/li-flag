import React from 'react';
import { Form, Input, Button, FormProps } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import api from '@/utils/httpRequest';

import { Styled_Register } from '../Styles';
import { OperationType } from '../constants';

type PropsType = {
  switchOpType: (e: React.MouseEvent, type: OperationType) => void;
  triggerLoginHandle: (values: { userId: string; password: string }) => void;
};

type registerFieldType = {
  userId: string;
  password: string;
  repectPassword: string;
};

const Register = (props: PropsType) => {
  const { switchOpType, triggerLoginHandle } = props;

  const registerHandle: FormProps<registerFieldType>['onFinish'] = async (values) => {
    const { userId, password, repectPassword } = values;

    const res = await api.post('/user/register', { userId, password, repectPassword });
    if (res && res.code === 0) {
      triggerLoginHandle({ userId, password });
    } else {
    }
  };
  return (
    <Styled_Register>
      <div className="user-register">
        <Form name="normal_register" className="register-form" onFinish={registerHandle}>
          <Form.Item name="userId" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item name="repectPassword" rules={[{ required: true, message: '请输入确认密码!' }]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="RepectPassword" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              注册
            </Button>
          </Form.Item>
        </Form>
        <div className="user-register-foot">
          <div>
            <a href="" className="register-btn" onClick={(e) => switchOpType(e, OperationType.LOGIN)}>
              返回登录
            </a>
          </div>
        </div>
      </div>
    </Styled_Register>
  );
};

export default Register;