import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraggableLocation } from 'react-beautiful-dnd';

import { RootState } from '@/app/store';
import { allModuleType, todoListItemType } from '@/types/todoType';

import { initialState, getTodoListThunk, addTodoItemThunk } from './dataAndMethods';

// todo: 临时处理，这里出现的 bug，可以忽略 后期 id 会是唯一的
export let idNum = 1000;

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoState: (state, action: PayloadAction<{ list: [] }>) => {
      const { list } = action.payload;

      const structure: any = {
        A: [],
        B: [],
        C: [],
        D: []
      };

      list.forEach((item: any) => {
        structure[item.moduleId].push(item);
      });

      Object.keys(structure).forEach((moduleId) => {
        const moduleList = structure[moduleId].sort((a: any, b: any) => a.order - b.order);
        state.eachModule[moduleId].listData = moduleList;
      });
    },
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
    addTodoItem: (state, action: PayloadAction<{ newTodoItem: any; type: string; insertIndex?: number }>) => {
      const { newTodoItem, type, insertIndex } = action.payload;
      if (type === 'tail') {
        state.eachModule[newTodoItem.moduleId].listData.push(newTodoItem);
      }
    },
    // Item 中完成状态改变
    toggleItemCompletedStatus: (state, action: PayloadAction<{ moduleId: string; itemIndex: number }>) => {
      const { moduleId, itemIndex } = action.payload;

      const item = state.eachModule[moduleId].listData[itemIndex];
      item.completed = !item.completed;
    }
  }
});

// 导出 分发动作
export const { setTodoState, sameModuleItemDrag, differentModuleItemDrag, addTodoItem, toggleItemCompletedStatus } = todoSlice.actions;

// 导出 异步动作
export { getTodoListThunk, addTodoItemThunk };

// 导出 todo 的 state值, 用 useAppSelector 也行
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
