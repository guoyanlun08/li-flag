import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DraggableLocation } from 'react-beautiful-dnd';

import { RootState } from '@/app/store';
import { allModuleType, todoListItemType } from '@/types/todoType';

import { initialState, fetchTodoList, fetchTodoListResolveCb } from './dataAndMethods';

// todo: 临时处理，这里出现的 bug，可以忽略 后期 id 会是唯一的
export let idNum = 1000;

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // 同一个模块中 Item 拖拽
    sameModuleItemDrag: (state, action: PayloadAction<{ moduleId: string; afterDragModule: todoListItemType[] }>) => {
      const { moduleId, afterDragModule } = action.payload;
      state.eachModule[moduleId].listData = afterDragModule;
    },
    // 不同模块中 Item 拖拽
    differentModuleItemDrag: (
      state,
      action: PayloadAction<{ source: DraggableLocation; destination: DraggableLocation; dragItem: todoListItemType }>
    ) => {
      const { source, destination, dragItem } = action.payload;

      state.eachModule[source.droppableId].listData.splice(source.index, 1);
      state.eachModule[destination.droppableId].listData.splice(destination.index, 0, dragItem);
    },
    // 增加 Item 项
    addTodoItem: (state, action: PayloadAction<{ moduleId: string; type: string; insertIndex?: number }>) => {
      const { moduleId, type, insertIndex } = action.payload;

      const templateItem = {
        moduleId,
        id: idNum++,
        value: [
          {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }]
          }
        ],
        completed: false
      };
      if (type === 'tail') {
        state.eachModule[moduleId].listData.push(templateItem);
      } else {
        if (typeof insertIndex === 'undefined') {
          throw Error('type 为 interval, insertIndex 是必需');
        } else {
          state.eachModule[moduleId].listData.splice(insertIndex + 1, 0, templateItem);
        }
      }
    },
    // Item 中完成状态改变
    toggleItemCompletedStatus: (state, action: PayloadAction<{ moduleId: string; itemIndex: number }>) => {
      const { moduleId, itemIndex } = action.payload;

      const item = state.eachModule[moduleId].listData[itemIndex];
      item.completed = !item.completed;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchTodoList.fulfilled, fetchTodoListResolveCb);
  }
});

// 导出 分发动作
export const { sameModuleItemDrag, differentModuleItemDrag, addTodoItem, toggleItemCompletedStatus } = todoSlice.actions;

// 导出 异步动作
export { fetchTodoList };

// 导出 todo 的 state值, 用 useAppSelector 也行
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
