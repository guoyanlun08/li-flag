import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraggableLocation } from 'react-beautiful-dnd';

import { RootState } from '@/app/store';
import { todoListItemType } from '@/types/todoType';

import { initialState, getTodoListThunk, addTodoItemThunk, updateTodoItemThunk, deleteTodoItemThunk } from './dataAndMethods';

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // 设置 todoState的 eachModule
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
    // 设置 todoState 单独 module数据
    setTodoModule: (state, action: PayloadAction<{ list: []; moduleId: string }>) => {
      const { list, moduleId } = action.payload;

      state.eachModule[moduleId].listData = list;
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
        state.selectedId = newTodoItem.id;
      }
    },
    // 设置 selectedId
    setSelectedId: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.selectedId = id;
    },
    // Item 中完成状态改变
    toggleItemCompletedStatus: (state, action: PayloadAction<{ moduleId: string; itemIndex: number }>) => {
      const { moduleId, itemIndex } = action.payload;
      const item = state.eachModule[moduleId].listData[itemIndex];

      item.completed = Number(!item.completed);
    }
  }
});

// 导出 分发动作
export const { setTodoState, sameModuleItemDrag, differentModuleItemDrag, addTodoItem, setSelectedId, toggleItemCompletedStatus } =
  todoSlice.actions;

// 导出 异步动作
export { getTodoListThunk, addTodoItemThunk, updateTodoItemThunk, deleteTodoItemThunk };

// 导出 todo 的 state值, 用 useAppSelector 也行
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
