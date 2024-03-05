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
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0
        },
        {
          id: 2,
          moduleId: 'A',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
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
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0
        },
        {
          id: 5,
          moduleId: 'B',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
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
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0
        },
        {
          id: 8,
          moduleId: 'C',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
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
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0
        },
        {
          id: 11,
          moduleId: 'D',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 1
        }
      ]
    }
  },
  eachModuleOrder: ['A', 'B', 'C', 'D'],
  selectedId: undefined
};

// 异步：设置 todoState的数据
export const getTodoListThunk = createAsyncThunk<any, { today?: boolean }>('todo/getTodoList', async (payload, { dispatch }) => {
  try {
    const { today } = payload;
    const resp = await api.get('/todoItem/getTodoList', { today: Number(today) });
    const { list } = resp.data;

    return list;
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
      const resp = await api.post('todoItem/addTodoItem', { moduleId, order });
      const { id, todoValue, isCompleted } = resp.data;
      const newTodoItem = {
        id,
        moduleId,
        todoValue,
        isCompleted,
        order
      };
      dispatch(addTodoItem({ newTodoItem, type, insertIndex: order }));
    } catch (e) {
      console.error(`新增失败:: addTodoItemThunk :: ${e}`);
    }
  }
);

// 异步：更新 todoItem的数据
export const updateTodoItemThunk = createAsyncThunk<any, { id: number; completed?: boolean; todoValue?: string }>(
  'todo/updateTodoItem',
  async (payload, { dispatch }) => {
    try {
      const { id, todoValue } = payload;

      const resp = await api.post('/todoItem/updateTodoItem', { id, todoValue });
    } catch (e) {
      console.error(`更新失败:: updateTodoItemThunk :: ${e}`);
    }
  }
);

// 异步： 删除 todoItem
export const deleteTodoItemThunk = createAsyncThunk<any, { id: number }>('todo/deleteTodoItem', async (payload, { dispatch }) => {
  try {
    const { id } = payload;

    const resp = await api.post('/todoItem/deleteTodoItemById', { id });
  } catch (e) {
    console.error(`删除失败:: deleteTodoItemThunk :: ${e}`);
  }
});
