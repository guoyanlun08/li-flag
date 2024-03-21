import React, { useContext, useState } from 'react';
import { ModalProps, FormProps, message } from 'antd';

import { useAppDispatch, AuthContext } from '@/app/hooks';
import api from '@/utils/httpRequest';
import { getTodoListThunk, setTodoEntireModule } from '@/features/todo/todoSlice';
import { setUserInfo } from '@/features/user/userSlice';

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
    try {
      const { data: res } = await api.post('/user/login', { ...values });

      if (res.token) {
        handleLogin(res.token);
        dispatch(setUserInfo({ userInfo: res.userInfo }));

        const { payload: list } = await dispatch(getTodoListThunk({ today: true }));
        dispatch(setTodoEntireModule({ list }));

        props.onLoginFinish(false);
      } else {
        message.error('登陆失败');
      }
    } catch (err: any) {
      message.error(`登陆失败: ${err.msg}`);
    }
  };

  /** 关闭登录弹窗触发 */
  const afterDialogVisibleChange = (): void => {
    // 切换标语
    setLoginTitle(LOGIN_TITLE_LIST[Math.floor(Math.random() * LOGIN_TITLE_LIST.length)]);
  };

  /** 注册登录态转化 */
  const switchLoginAndRegister = (e: React.MouseEvent, type: OperationType): void => {
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
        <Register switchOpType={switchLoginAndRegister} triggerLoginHandle={loginHandle} />
      ) : (
        <Login switchOpType={switchLoginAndRegister} loginHandle={loginHandle} />
      )}
      <Agreement />
    </Styled_LoginModal>
  );
}
