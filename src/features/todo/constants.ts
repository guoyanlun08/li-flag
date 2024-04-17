import { TodoStateType } from '@/types/todoType';

// 每日模块 —— moduleId 枚举
export enum ModuleFields {
  IMPORTANT_URGENT = 'A',
  IMPORTANT_NOT_URGENT = 'B',
  NOT_IMPORTANT_URGENT = 'C',
  NOT_IMPORTANT_NOT_URGENT = 'D'
}

// TODO: variables.module.scss Card 和 List 组件处理完要去除掉 variables.module.scss文件
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

// 初始化数据
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
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
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
        }
      ]
    }
  },
  // XXX: 这里的 satet.selectedItem中的 todoValue不一定是准确的
  selectedItem: undefined
};
