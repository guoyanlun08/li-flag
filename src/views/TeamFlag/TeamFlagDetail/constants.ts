/** 优先级默认选项
 * TODO: 今后可以设计标签表来自定义
 */
export const PRIORITY_DEFAULT_OPTIONS = [
  {
    label: 'p0',
    value: '0',
    color: 'red'
  },
  {
    label: 'p1',
    value: '1',
    color: 'gold'
  },
  {
    label: 'p2',
    value: '2',
    color: 'green'
  },
  {
    label: 'p3',
    value: '3',
    color: 'cyan'
  },
  {
    label: 'p4',
    value: '4',
    color: 'purple'
  }
];

/** 处理状态默认选项 */
export const PROCESSING_STATUS_OPTIONS = [
  {
    label: '待处理',
    value: 1,
    color: 'volcano'
  },
  {
    label: '处理中',
    value: 2,
    color: 'geekblue'
  },
  {
    label: '已完成',
    value: 3,
    color: 'green'
  }
];

/** 获取 teamFlag 信息轮询时间 */
export const TEAM_FLAG_INFO_POLLING_TIME = 20000;

export enum LockStatus {
  Unlocked = 0,
  SelfLocked = 1,
  OtherLocked = 2
}

export const LOCK_BTN_CONFIG = {
  [LockStatus.Unlocked]: {
    text: '锁定',
    disabled: false
  },
  [LockStatus.SelfLocked]: {
    text: '解锁',
    disabled: false
  },
  [LockStatus.OtherLocked]: {
    text: '他人锁定中',
    disabled: true
  }
};
