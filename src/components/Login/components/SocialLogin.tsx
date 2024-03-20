import React, { useState } from 'react';
import { QRCode } from 'antd';

import IconFont from '@/components/iconFont';

import { SOCIAL_TYPE_MAP, LoginMode, SocialType } from '../constants';

type PropsType = {
  loginMode: LoginMode;
  switchLoginMode: (loginType: LoginMode) => void;
};

const SocialLogin = (props: PropsType) => {
  const { loginMode, switchLoginMode } = props;
  const [socialType, setSocialType] = useState<'' | SocialType>('');

  /** 切换其他平台登录 */
  const switchSocialLogin = (type: SocialType): void => {
    switchLoginMode(LoginMode.SOCIAL);
    setSocialType(type);
  };
  return (
    <div className="social-login">
      {loginMode === LoginMode.SOCIAL ? (
        <div className="social-login-unfold">
          {/* 目前仅做展示，实际实现到时候看需要什么东西再改 */}
          <QRCode
            errorLevel="H"
            value={'https://liflag/login' + socialType}
            // 这个icon要看看怎么用本地图片
            // icon="./../../assets/imgs/github.png"
          />
          <span>{SOCIAL_TYPE_MAP[socialType]}</span>
          <div className="social-login-footer">
            {socialType === SocialType.WEIBO && (
              <>
                <IconFont name="icon-weixin" style={{ fontSize: '30px' }} onClick={() => switchSocialLogin(SocialType.WECHAT)} />
                <IconFont name="icon-github" style={{ fontSize: '30px' }} onClick={() => switchSocialLogin(SocialType.GITHUB)} />
              </>
            )}
            {socialType === SocialType.WECHAT && (
              <>
                <IconFont name="icon-weibo" style={{ fontSize: '30px' }} onClick={() => switchSocialLogin(SocialType.WEIBO)} />
                <IconFont name="icon-github" style={{ fontSize: '30px' }} onClick={() => switchSocialLogin(SocialType.GITHUB)} />
              </>
            )}
            {socialType === SocialType.GITHUB && (
              <>
                <IconFont name="icon-weibo" style={{ fontSize: '30px' }} onClick={() => switchSocialLogin(SocialType.WEIBO)} />
                <IconFont name="icon-weixin" style={{ fontSize: '30px' }} onClick={() => switchSocialLogin(SocialType.WECHAT)} />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="social-login-fold">
          <div onClick={() => switchSocialLogin(SocialType.WEIBO)}>
            <IconFont name="icon-weibo" style={{ fontSize: '30px' }} />
            <span>微博登录</span>
          </div>
          <div onClick={() => switchSocialLogin(SocialType.WECHAT)}>
            <IconFont name="icon-weixin" style={{ fontSize: '30px' }} />
            <span>微信登录</span>
          </div>
          <div onClick={() => switchSocialLogin(SocialType.GITHUB)}>
            <IconFont name="icon-github" style={{ fontSize: '30px' }} />
            <span>GitHub登录</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLogin;
