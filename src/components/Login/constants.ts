/** 登录或注册操作类型 */
export enum OperationType {
  LOGIN = 'login',
  REGISTER = 'register'
}

/** 登录模式类型 */
export enum LoginMode {
  ACCOUNT_AND_PHONE = 'accountAndPhone',
  SOCIAL = 'social'
}

export enum SocialType {
  WEIBO = 'weibo',
  WECHAT = 'wechat',
  GITHUB = 'github'
}

export const SOCIAL_TYPE_MAP: any = {
  [SocialType.WEIBO]: '微博登录',
  [SocialType.WECHAT]: '微信登录',
  [SocialType.GITHUB]: 'GitHub登录'
};

export const LOGIN_TITLE_LIST = [
  '先立个小目标，赚它一个亿!',
  '加油！！今天也要好好努力哟！',
  '不要让时间成为垃圾堆。',
  '放弃不需要的念头，心身轻松。',
  '别让梦想成为你唯一的邻居。'
];
