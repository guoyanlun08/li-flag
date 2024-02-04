import React, {useState} from 'react';
import IconFont from '@/components/iconFont';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Modal, ModalProps, Form, Input, Button, QRCode } from 'antd';
import { Styled_LoginBox, Styled_Agreement } from './Styles';

interface loginProps extends ModalProps {};
const loginTitleList = [
  '先立个小目标，赚它一个亿!',
  '加油！！今天也要好好努力哟！',
  '不要让时间成为垃圾堆。',
  '放弃不需要的念头，心身轻松。',
  '别让梦想成为你唯一的邻居。'
];

export default function Login(props: loginProps) {
  const [switchLogin, setSwitchLogin] = useState('accountAndPhone');
  const [socialType, setSocialType] = useState('');
  const [loginTitle, setLoginTitle] = useState(loginTitleList[Math.floor(Math.random() * loginTitleList.length)]);
  const onFinish = (values: any) => {
    // 表单提交操作
    console.log('Received values of form: ', values);
  };
  
  const afterDialogVisibleChange = ():void => {
    // 切换标语
    setLoginTitle(loginTitleList[Math.floor(Math.random() * loginTitleList.length)]);
    // 重置登录方式
    setSwitchLogin('accountAndPhone');
  };
  const socialTypeMap:any = {
    weibo: '微博登录',
    wechat: '微信登录',
    github: 'GitHub登录'
  }
  const switchSocialLogin = (type: string):void => {
    setSwitchLogin('social')
    setSocialType(type)
  }
  return (
    <Modal 
      {...props}
      style={{ top: 100 }}
      title={loginTitle}
      className="login-modal"
      width={600}
      maskClosable={false}
      footer={false}
      afterClose={afterDialogVisibleChange}
    >
      <Styled_LoginBox active={switchLogin}>
        <div className='pwd-login'>
          <div className='pwd-login-unfold'>
            <Form
              name="normal_login"
              className="login-form"
              onFinish={onFinish}
            >
              {/* <div className='login-title'>
                <span>先立个小目标，赚它一个亿!</span>
              </div> */}
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登入
                </Button>
              </Form.Item>
            </Form>
            <div className='user-pwd-foot'>
              <div>
                <span>没有账号？</span>
                <a href='' className='register-btn'>注册</a>
              </div>
              <div>
                <a href=''>忘记密码？</a>
              </div>
            </div>
          </div>
          <div className='pwd-login-fold'>
              <div onClick={() => setSwitchLogin('accountAndPhone')}>
                <IconFont name='icon-mima1' style={{fontSize: '30px'}}/>
                <span>密码登录</span>
              </div>
              {/* todo: 手机登录还没做,暂时都显示密码登录 */}
              <div onClick={() => setSwitchLogin('accountAndPhone')}>
                <IconFont name='icon-shouji' style={{fontSize: '30px'}}/>
                <span>手机登录</span>
              </div>
          </div>
        </div>
        <div className='social-login'>
          <div className='social-login-unfold'>
            {/* 目前仅做展示，实际实现到时候看需要什么东西再改 */}
            <QRCode
              errorLevel="H"
              value={"https://liflag/login" + socialType}
              // 这个icon要看看怎么用本地图片
              // icon="./../../assets/imgs/github.png"
            />
            <span>{socialTypeMap[socialType]}</span>
            <div className='social-login-footer'>
              {
                socialType === 'weibo'
                && <>
                  <IconFont name='icon-weixin' style={{ fontSize: '30px' }} onClick={() => switchSocialLogin('wechat')}/>
                  <IconFont name='icon-github' style={{ fontSize: '30px' }} onClick={() => switchSocialLogin('github')}/>
                </>
              }
              {
                socialType === 'wechat'
                && <>
                  <IconFont name='icon-weibo' style={{ fontSize: '30px' }} onClick={() => switchSocialLogin('weibo')}/>
                  <IconFont name='icon-github' style={{ fontSize: '30px' }} onClick={() => switchSocialLogin('github')}/>
                </>
              }
              {
                socialType === 'github'
                && <>
                  <IconFont name='icon-weibo' style={{ fontSize: '30px' }} onClick={() => switchSocialLogin('weibo')}/>
                  <IconFont name='icon-weixin' style={{ fontSize: '30px' }} onClick={() => switchSocialLogin('wechat')}/>
                </>
              }
            </div>
          </div>
          <div className='social-login-fold'>
            <div onClick={() => switchSocialLogin('weibo')}>
              <IconFont name='icon-weibo' style={{ fontSize: '30px' }}/>
              <span>微博登录</span>
            </div>
            <div onClick={() => switchSocialLogin('wechat')}>
              <IconFont name='icon-weixin' style={{ fontSize: '30px' }}/>
              <span>微信登录</span>
            </div>
            <div onClick={() => switchSocialLogin('github')}>
              <IconFont name='icon-github' style={{ fontSize: '30px' }}/>
              <span>GitHub登录</span> 
            </div>
          </div>
        </div>
      </Styled_LoginBox>
      <Styled_Agreement>
        <span>注册登录即表示同意<a href="">用户协议</a>和<a href="">隐私协议</a></span>
      </Styled_Agreement>
    </Modal>
  );
}