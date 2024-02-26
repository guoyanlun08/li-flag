import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { allModuleType } from '@/types/todoType';
import api from '@/utils/httpRequest';

import variables from '@/styles/variables.module.scss';

// 初始化数据
export const initialState: allModuleType = {
  eachModule: {
    A: {
      moduleId: 'A',
      bgColor: variables.mainRed,
      listData: [
        {
          id: 1,
          moduleId: 'A',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        },
        {
          id: 2,
          moduleId: 'A',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: true
        },
        {
          id: 3,
          moduleId: 'A',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        }
      ]
    },
    B: {
      moduleId: 'B',
      bgColor: variables.mainBlue,
      listData: [
        {
          id: 4,
          moduleId: 'B',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        },
        {
          id: 5,
          moduleId: 'B',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: true
        },
        {
          id: 6,
          moduleId: 'B',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        }
      ]
    },
    C: {
      moduleId: 'C',
      bgColor: variables.mainGreen,
      listData: [
        {
          id: 7,
          moduleId: 'C',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        },
        {
          id: 8,
          moduleId: 'C',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: true
        },
        {
          id: 9,
          moduleId: 'C',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        }
      ]
    },
    D: {
      moduleId: 'D',
      bgColor: variables.mainGray,
      listData: [
        {
          id: 10,
          moduleId: 'D',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        },
        {
          id: 11,
          moduleId: 'D',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: true
        },
        {
          id: 12,
          moduleId: 'D',
          value: [
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ],
          completed: false
        }
      ]
    }
  },
  eachModuleOrder: ['A', 'B', 'C', 'D']
};

// 异步：设置 todoState的数据
export const fetchTodoList = createAsyncThunk('todo/fetchTodoList', async () => {
  const response = await api.get('/todoItem/getTodoList');
  return response.data;
});

// fetchTodoList.fulfilled 处理函数
export const fetchTodoListResolveCb = (state: allModuleType, action: PayloadAction<any>) => {
  const { list } = action.payload;
  console.log(list);

  const structure: any = {
    A: [],
    B: [],
    C: [],
    D: []
  };

  list.forEach((item: any) => {
    structure[item.module].push(item);
  });

  Object.keys(structure).forEach((moduleId) => {
    const moduleList = structure[moduleId].sort((a: any, b: any) => a.order - b.order);
    state.eachModule[moduleId].listData = moduleList;
  });
};
