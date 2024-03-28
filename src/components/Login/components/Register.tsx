import React from 'react';
import { Form, Input, Button, FormProps, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import api from '@/utils/httpRequest';
import { passwordRules, confirmPasswordRules } from '@/utils/formRules';

import { Styled_Register } from '../Styles';
import { OperationType } from '../constants';

type PropsType = {
  switchOpType: (e: React.MouseEvent, type: OperationType) => void;
  triggerLoginHandle: (values: { userId: string; password: string }) => void;
};

type registerFieldType = {
  userId: string;
  password: string;
  repeatPassword: string;
};

const Register = (props: PropsType) => {
  const { switchOpType, triggerLoginHandle } = props;

  const registerHandle: FormProps<registerFieldType>['onFinish'] = async (values) => {
    try {
      const { userId, password, repeatPassword } = values;
      const res = await api.post('/user/register', { userId, password, repeatPassword });
      if (res?.code === 0) {
        triggerLoginHandle({ userId, password });
      }
    } catch (err: any) {
      console.error(err.msg);
      message.error(`注册失败: ${err.msg}`);
    }
  };
  return (
    <Styled_Register>
      <div className="user-register">
        <Form name="normal_register" className="register-form" onFinish={registerHandle}>
          <Form.Item name="userId" hasFeedback rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" hasFeedback rules={passwordRules}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item name="repeatPassword" hasFeedback rules={confirmPasswordRules}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="repeatPassword" />
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
