import { createAsyncThunk } from '@reduxjs/toolkit';

import { todoStateType, todoListItemType } from '@/types/todoType';
import api from '@/utils/httpRequest';
import { addTodoItem } from './todoSlice';

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
          completed: 0,
          order: 1,
          createTime: Date.now(),
          updateTime: Date.now()
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
          completed: 1,
          order: 2,
          createTime: Date.now(),
          updateTime: Date.now()
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
          completed: 0,
          order: 1,
          createTime: Date.now(),
          updateTime: Date.now()
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
          completed: 1,
          order: 2,
          createTime: Date.now(),
          updateTime: Date.now()
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
          completed: 0,
          order: 1,
          createTime: Date.now(),
          updateTime: Date.now()
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
          completed: 1,
          order: 2,
          createTime: Date.now(),
          updateTime: Date.now()
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
          completed: 0,
          order: 1,
          createTime: Date.now(),
          updateTime: Date.now()
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
          completed: 1,
          order: 2,
          createTime: Date.now(),
          updateTime: Date.now()
        }
      ]
    }
  },
  eachModuleOrder: ['A', 'B', 'C', 'D'],
  selectedItem: undefined
};

// 异步：设置 todoState的数据
export const getTodoListThunk = createAsyncThunk<any, { today?: boolean; moduleId?: string }>(
  'todo/getTodoList',
  async (payload, { dispatch }) => {
    try {
      const { today = false, moduleId } = payload;
      const resp = await api.get('/todoItem/getTodoList', { moduleId, today: Number(today) });
      const { list } = resp.data;

      return list;
    } catch (e) {
      console.error(`获取失败:: getTodoListThunk :: ${e}`);
    }
  }
);

// 异步：新增 todoItem的数据
export const addTodoItemThunk = createAsyncThunk<any, { moduleId: string; order: number; type: string }>(
  'todo/addTodoItem',
  async (payload, { dispatch }) => {
    try {
      const { moduleId, order, type } = payload;
      const resp = await api.post('/todoItem/addTodoItem', { moduleId, order });
      if (resp?.code === 0) {
        const { newTodoItem } = resp.data;

        dispatch(addTodoItem({ newTodoItem, type, insertIndex: order }));
      } else {
        throw new Error('新增失败');
      }
    } catch (e) {
      console.error(`新增失败:: addTodoItemThunk :: ${e}`);
    }
  }
);

// 异步：更新 todoItem的数据
export const updateTodoItemThunk = createAsyncThunk<any, { id: number; completed?: number; todoValue?: string }>(
  'todo/updateTodoItem',
  async (payload, { dispatch }) => {
    try {
      const { id, todoValue, completed } = payload;

      const resp = await api.post('/todoItem/updateTodoItem', { id, todoValue, completed });

      if (resp?.code === 0) {
        return true;
      } else {
        throw new Error('更新失败');
      }
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

// 异步： 更新 todo module
export const updateTodoOrderAfterDragThunk = createAsyncThunk<any, { source: any; destination: any }>(
  'todo/updateTodoOrderAfterDrag',
  async (payload, { dispatch }) => {
    try {
      const { source, destination } = payload;
      const resp = await api.put('/todoItem/updateTodoOrderAfterDrag', { source, destination });

      if (resp?.code === 0) {
        return resp.data;
      } else {
        throw new Error('更新失败');
      }
    } catch (e) {
      console.error(`更新失败:: updateTodoOrderAfterDragThunk :: ${e}`);
      return false;
    }
  }
);
