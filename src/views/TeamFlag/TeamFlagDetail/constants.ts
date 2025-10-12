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

/** 锁定超时时间，单位：分钟 */
export const LOCK_TIMEOUT_MINUTES = 5;

export enum LockStatus {
  Unlocked = 0,
  SelfLocked = 1,
  OtherLocked = 2
}

/** 锁定按钮配置 */
export const LOCK_BTN_CONFIG = {
  [LockStatus.Unlocked]: {
    text: () => '锁定',
    disabled: false
  },
  [LockStatus.SelfLocked]: {
    text: () => '解锁',
    disabled: false
  },
  [LockStatus.OtherLocked]: {
    text: (locker?: string | null) => `已被 ${locker || '他人'} 锁定中`,
    disabled: true
  }
};

/** todoList 过滤参数 */
export enum TodoListFilterParams {
  /** 处理人 */
  Processor = 'processor',
  /** 优先级 */
  Priority = 'priority'
}
