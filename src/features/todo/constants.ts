import { TodoStateType } from '@/types/todoType';
import dayjs from 'dayjs';

/** 每日模块 —— moduleId 枚举 */
export enum ModuleFields {
  IMPORTANT_URGENT = 'A',
  IMPORTANT_NOT_URGENT = 'B',
  NOT_IMPORTANT_URGENT = 'C',
  NOT_IMPORTANT_NOT_URGENT = 'D'
}

/** 每个模块的配置 */
export const MODULE_CONFIG_MAP = {
  [ModuleFields.IMPORTANT_URGENT]: {
    color: '#ff4d4f',
    name: '重要且紧急'
  },
  [ModuleFields.IMPORTANT_NOT_URGENT]: {
    color: '#ffb000',
    name: '重要不紧急'
  },
  [ModuleFields.NOT_IMPORTANT_URGENT]: {
    color: '#1677ff',
    name: '不重要但紧急'
  },
  [ModuleFields.NOT_IMPORTANT_NOT_URGENT]: {
    color: '#31c27c',
    name: '不重要不紧急'
  }
};

/** todo 初始化数据 */
export const initialState: TodoStateType = {
  eachModule: {
    A: {
      moduleId: ModuleFields.IMPORTANT_URGENT,
      title: MODULE_CONFIG_MAP[ModuleFields.IMPORTANT_URGENT].name,
      color: MODULE_CONFIG_MAP[ModuleFields.IMPORTANT_URGENT].color,
      listData: [
        {
          id: -1,
          moduleId: ModuleFields.IMPORTANT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '限时完成的重要工作' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        },
        {
          id: -2,
          moduleId: ModuleFields.IMPORTANT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '影响深远的事情' }]
            }
          ]),
          completed: 1,
          order: 2,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        }
      ]
    },
    B: {
      moduleId: ModuleFields.IMPORTANT_NOT_URGENT,
      title: MODULE_CONFIG_MAP[ModuleFields.IMPORTANT_NOT_URGENT].name,
      color: MODULE_CONFIG_MAP[ModuleFields.IMPORTANT_NOT_URGENT].color,
      listData: [
        {
          id: -3,
          moduleId: ModuleFields.IMPORTANT_NOT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '做计划、中长期规划；思考工作方法和流程改进' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        },
        {
          id: -4,
          moduleId: ModuleFields.IMPORTANT_NOT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '工作沟通协调；向领导提建议等' }]
            }
          ]),
          completed: 1,
          order: 2,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        }
      ]
    },
    C: {
      moduleId: ModuleFields.NOT_IMPORTANT_URGENT,
      title: MODULE_CONFIG_MAP[ModuleFields.NOT_IMPORTANT_URGENT].name,
      color: MODULE_CONFIG_MAP[ModuleFields.NOT_IMPORTANT_URGENT].color,
      listData: [
        {
          id: -5,
          moduleId: ModuleFields.NOT_IMPORTANT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '有些电话、邮件、报告；大部分会议' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        },
        {
          id: -6,
          moduleId: ModuleFields.NOT_IMPORTANT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '许多迫在眉睫的小事' }]
            }
          ]),
          completed: 1,
          order: 2,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        }
      ]
    },
    D: {
      moduleId: ModuleFields.NOT_IMPORTANT_NOT_URGENT,
      title: MODULE_CONFIG_MAP[ModuleFields.NOT_IMPORTANT_NOT_URGENT].name,
      color: MODULE_CONFIG_MAP[ModuleFields.NOT_IMPORTANT_NOT_URGENT].color,
      listData: [
        {
          id: -7,
          moduleId: ModuleFields.NOT_IMPORTANT_NOT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '忙碌琐碎小事；某些要出来的文件' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        },
        {
          id: -8,
          moduleId: ModuleFields.NOT_IMPORTANT_NOT_URGENT,
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: '交际应酬等' }]
            }
          ]),
          completed: 1,
          order: 2,
          createTime: dayjs().valueOf(),
          updateTime: dayjs().valueOf(),
          startTime: dayjs().valueOf(),
          endTime: dayjs().valueOf()
        }
      ]
    }
  },
  delayListDataMap: {
    [ModuleFields.IMPORTANT_URGENT]: [],
    [ModuleFields.IMPORTANT_NOT_URGENT]: [],
    [ModuleFields.NOT_IMPORTANT_URGENT]: [],
    [ModuleFields.NOT_IMPORTANT_NOT_URGENT]: []
  },
  selectedId: undefined
};
