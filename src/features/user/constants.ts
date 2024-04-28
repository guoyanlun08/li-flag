import { UserStateType } from './type';

export const initialState: UserStateType = {
  userId: 'FlagUser',
  nickName: 'FlagUser',
  updateTime: Date.now(),
  lastOnlineTime: Date.now(),
  createTime: Date.now(),
  avatarPath: ''
};
