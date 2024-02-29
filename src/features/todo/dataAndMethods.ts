import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { todoStateType } from '@/types/todoType';
import api from '@/utils/httpRequest';
import { setTodoState, addTodoItem } from './todoSlice';

import variables from '@/styles/variables.module.scss';

// 初始化数据
export const initialState: todoStateType = {
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
          completed: 0
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
          completed: 1
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
          completed: 0
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
          completed: 1
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
          completed: 0
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
          completed: 1
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
          completed: 0
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
          completed: 1
        }
      ]
    }
  },
  eachModuleOrder: ['A', 'B', 'C', 'D'],
  selectedId: undefined
};

// 异步：设置 todoState的数据
export const getTodoListThunk = createAsyncThunk('todo/getTodoList', async (payload, { dispatch }) => {
  try {
    const response = await api.get('/todoItem/getTodoList');
    const { list } = response.data;

    dispatch(setTodoState({ list }));
  } catch (e) {
    console.error(`获取失败:: getTodoListThunk :: ${e}`);
  }
});

// 异步：新增 todoItem的数据
export const addTodoItemThunk = createAsyncThunk<any, { moduleId: string; order: number; type: string }>(
  'todo/addTodoItem',
  async (payload, { dispatch }) => {
    try {
      const { moduleId, order, type } = payload;
      const response = await api.post('todoItem/addTodoItem', { moduleId, order });
      const { id, value, isCompleted } = response.data;
      const newTodoItem = {
        id,
        moduleId,
        value,
        isCompleted,
        order
      };
      dispatch(addTodoItem({ newTodoItem, type, insertIndex: order }));
    } catch (e) {
      console.error(`新增失败:: addTodoItemThunk :: ${e}`);
    }
  }
);

export const updateTodoItemThunk = createAsyncThunk<any, { completed?: boolean }>('todo/updateTodoItem', async () => {
  try {
    // api.post('/todoItem/updateTodoItem')
  } catch (e) {}
});