import React, { useContext, useState } from 'react';
import { ModalProps, FormProps, message } from 'antd';

import { useAppDispatch, AuthContext } from '@/app/hooks';
import api from '@/utils/httpRequest';
import { getTodoListThunk, setTodoEntireModule } from '@/features/todo/todoSlice';

import { Agreement, Register, Login } from './components';
import { Styled_LoginModal } from './Styles';
import { LOGIN_TITLE_LIST, OperationType } from './constants';

interface LoginProps extends ModalProps {
  onLoginFinish: (val: boolean) => void;
}

export default function LoginModal(props: LoginProps) {
  const { handleLogin } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const [opType, setOpType] = useState<OperationType>(OperationType.LOGIN); // 登录或注册操作状态
  const [loginTitle, setLoginTitle] = useState(LOGIN_TITLE_LIST[Math.floor(Math.random() * LOGIN_TITLE_LIST.length)]);

  /** 登录逻辑实现 */
  const loginHandle: FormProps<{ userId: string; password: string }>['onFinish'] = async (values) => {
    // 表单提交操作
    const { data: res } = await api.post('/user/login', { ...values });

    if (res.token) {
      handleLogin(res.token);
      const { payload: list } = await dispatch(getTodoListThunk({ today: true }));
      dispatch(setTodoEntireModule({ list }));

      props.onLoginFinish(false);
    } else {
      // FIXME: 出错有问题需要看看 请求器逻辑
      message.error('登陆失败');
    }
  };

  /** 关闭登录弹窗触发 */
  const afterDialogVisibleChange = (): void => {
    // 切换标语
    setLoginTitle(LOGIN_TITLE_LIST[Math.floor(Math.random() * LOGIN_TITLE_LIST.length)]);
  };

  /** 注册登录态转化 */
  const swithLoginAndRegister = (e: React.MouseEvent, type: OperationType): void => {
    e.preventDefault();
    setOpType(type);
  };

  return (
    <Styled_LoginModal
      {...props}
      style={{ top: 100 }}
      title={loginTitle}
      width={600}
      maskClosable={false}
      footer={false}
      afterClose={afterDialogVisibleChange}>
      {opType === OperationType.REGISTER ? (
        <Register switchOpType={swithLoginAndRegister} triggerLoginHandle={loginHandle} />
      ) : (
        <Login switchOpType={swithLoginAndRegister} loginHandle={loginHandle} />
      )}
      <Agreement />
    </Styled_LoginModal>
  );
}
