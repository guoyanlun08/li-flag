import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraggableLocation } from 'react-beautiful-dnd';

import { RootState } from '@/app/store';
import variables from '@/styles/variables.module.scss';
import { allModuleType, todoListItemType } from '@/types/todoType';

// todo: 临时处理，这里出现的 bug，可以忽略 后期 id 会是唯一的
export let idNum = 1000;

// todo: 先写死
const initialState: allModuleType = {
  eachModule: {
    A: {
      moduleId: 'A',
      bgColor: variables.mainRed,
      listData: [
        {
          id: 1,
          moduleId: 'A',
          text: 'A-111',
          completed: false
        },
        {
          id: 2,
          moduleId: 'A',
          text: 'A-222',
          completed: true
        },
        {
          id: 3,
          moduleId: 'A',
          text: 'A-333',
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
          text: 'B-111',
          completed: false
        },
        {
          id: 5,
          moduleId: 'B',
          text: 'B-222',
          completed: true
        },
        {
          id: 6,
          moduleId: 'B',
          text: 'B-333',
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
          text: 'C-111',
          completed: false
        },
        {
          id: 8,
          moduleId: 'C',
          text: 'C-222',
          completed: true
        },
        {
          id: 9,
          moduleId: 'C',
          text: 'C-333',
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
          text: 'D-111',
          completed: false
        },
        {
          id: 11,
          moduleId: 'D',
          text: 'D-222',
          completed: true
        },
        {
          id: 12,
          moduleId: 'D',
          text: 'D-333',
          completed: false
        }
      ]
    }
  },
  eachModuleOrder: ['A', 'B', 'C', 'D']
};

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
        text: '',
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
  }
});

// 导出 分发动作
export const { sameModuleItemDrag, differentModuleItemDrag, addTodoItem, toggleItemCompletedStatus } = todoSlice.actions;

// 导出 todo 的 state值, 用 useAppSelector 也行
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
