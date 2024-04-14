import { createAsyncThunk } from '@reduxjs/toolkit';

import { TodoListItemType, TodoStateType } from '@/types/todoType';
import api from '@/utils/httpRequest';

import variables from '@/styles/variables.module.scss';

export type getTodoListReqData = {
  today: boolean;
  moduleId: string;
  completed: number;
  startTime: string;
  endTime: string;
  isSkip: boolean;
};

// 初始化数据
export const initialState: TodoStateType = {
  eachModule: {
    A: {
      moduleId: 'A',
      bgColor: variables.mainRed,
      listData: [
        {
          id: -1,
          moduleId: 'A',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
        },
        {
          id: -2,
          moduleId: 'A',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
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
      moduleId: 'B',
      bgColor: variables.mainBlue,
      listData: [
        {
          id: -3,
          moduleId: 'B',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
        },
        {
          id: -4,
          moduleId: 'B',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
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
      moduleId: 'C',
      bgColor: variables.mainGreen,
      listData: [
        {
          id: -5,
          moduleId: 'C',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
        },
        {
          id: -6,
          moduleId: 'C',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
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
      moduleId: 'D',
      bgColor: variables.mainGray,
      listData: [
        {
          id: -7,
          moduleId: 'D',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
            }
          ]),
          completed: 0,
          order: 1,
          createTime: new Date().toLocaleString(),
          updateTime: new Date().toLocaleString()
        },
        {
          id: -8,
          moduleId: 'D',
          todoValue: JSON.stringify([
            {
              type: 'paragraph',
              children: [{ text: 'A line of text in a paragraph.' }]
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
  eachModuleOrder: ['A', 'B', 'C', 'D'],
  selectedItem: undefined
};

// 异步：设置 todoState的数据
export const getTodoListThunk = createAsyncThunk<any, Partial<getTodoListReqData>>('todo/getTodoList', async (payload) => {
  try {
    const { today = false, ...data } = payload;

    const resp = await api.get('/todoItem/getTodoList', { today: Number(today), ...data });
    const { list } = resp.data;

    return list;
  } catch (e) {
    console.error(`获取失败:: getTodoListThunk :: ${e}`);
  }
});

// 异步：新增 todoItem的数据
export const addTodoItemThunk = createAsyncThunk<
  any,
  { moduleId: string; order: number; type: 'tail' | 'insert'; listData?: TodoListItemType[] }
>('todo/addTodoItem', async (payload) => {
  try {
    const { moduleId, order, type, listData } = payload;
    const resp = await api.post('/todoItem/addTodoItem', { moduleId, order, type, listData });
    if (resp?.code === 0) {
      return resp.data;
    } else {
      throw new Error('新增失败');
    }
  } catch (e) {
    console.error(`新增失败:: addTodoItemThunk :: ${e}`);
  }
});

// 异步：更新 todoItem的数据
export const updateTodoItemThunk = createAsyncThunk<any, { id: number; completed?: number; todoValue?: string }>(
  'todo/updateTodoItem',
  async (payload) => {
    try {
      const { id, todoValue, completed } = payload;

      const resp = await api.put('/todoItem/updateTodoItem', { id, todoValue, completed });

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

    const resp = await api.delete('/todoItem/deleteTodoItemById', { id });
  } catch (e) {
    console.error(`删除失败:: deleteTodoItemThunk :: ${e}`);
  }
});

// 异步： 更新 todo module ———— 只传 sourceListData 代表是同模块拖拽
export const updateTodoOrderAfterDragThunk = createAsyncThunk<
  any,
  { sourceListData: any; destinationListData?: any; dragItem?: TodoListItemType }
>('todo/updateTodoOrderAfterDrag', async (payload, { dispatch }) => {
  try {
    const { sourceListData, destinationListData, dragItem } = payload;
    const resp = await api.put('/todoItem/updateTodoOrderAfterDrag', { sourceListData, destinationListData, dragItem });

    if (resp?.code === 0) {
      return resp.data;
    } else {
      throw new Error('更新失败');
    }
  } catch (e) {
    console.error(`更新失败:: updateTodoOrderAfterDragThunk :: ${e}`);
    return false;
  }
});
