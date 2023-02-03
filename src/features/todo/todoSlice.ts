import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DraggableLocation } from 'react-beautiful-dnd';

import { RootState } from '@/app/store';
import variables from '@/styles/variables.module.scss';
import { allModuleType, listItemType } from '@/types/todoType';

// todo: 临时处理，这里出现的 bug，可以忽略 后期 id 会是唯一的
let idNum = 1000;

// todo: 先写死
const initialState: allModuleType = {
  eachModule: {
    'droppable-list-A': {
      moduleId: 'droppable-list-A',
      title: 'A',
      bgColor: variables.mainRed,
      listData: [
        {
          id: 1,
          text: '<p>A-111</p>',
          completed: false
        },
        {
          id: 2,
          text: '<p>A-222</p>',
          completed: true
        },
        {
          id: 3,
          text: '<p>A-333</p>',
          completed: false
        }
      ]
    },
    'droppable-list-B': {
      moduleId: 'droppable-list-B',
      title: 'B',
      bgColor: variables.mainBlue,
      listData: [
        {
          id: 4,
          text: '<p>B-111</p>',
          completed: false
        },
        {
          id: 5,
          text: '<p>B-222</p>',
          completed: true
        },
        {
          id: 6,
          text: '<p>B-333</p>',
          completed: false
        }
      ]
    },
    'droppable-list-C': {
      moduleId: 'droppable-list-C',
      title: 'C',
      bgColor: variables.mainGreen,
      listData: [
        {
          id: 7,
          text: '<p>C-111</p>',
          completed: false
        },
        {
          id: 8,
          text: '<p>C-222</p>',
          completed: true
        },
        {
          id: 9,
          text: '<p>C-333</p>',
          completed: false
        }
      ]
    },
    'droppable-list-D': {
      moduleId: 'droppable-list-D',
      title: 'D',
      bgColor: variables.mainGray,
      listData: [
        {
          id: 10,
          text: '<p>D-111</p>',
          completed: false
        },
        {
          id: 11,
          text: '<p>D-222</p>',
          completed: true
        },
        {
          id: 12,
          text: '<p>D-333</p>',
          completed: false
        }
      ]
    }
  },
  eachModuleOrder: ['droppable-list-A', 'droppable-list-B', 'droppable-list-C', 'droppable-list-D']
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    sameModuleItemDrag: (state, action: PayloadAction<{ moduleId: string; afterDragModule: listItemType[] }>) => {
      const { moduleId, afterDragModule } = action.payload;
      state.eachModule[moduleId].listData = afterDragModule;
    },
    differentModuleItemDrag: (
      state,
      action: PayloadAction<{ source: DraggableLocation; destination: DraggableLocation; dragItem: listItemType }>
    ) => {
      const { source, destination, dragItem } = action.payload;
      state.eachModule[source.droppableId].listData.splice(source.index, 1);
      state.eachModule[destination.droppableId].listData.splice(destination.index, 0, dragItem);
    },
    addTodoItem: (state, action: PayloadAction<{ moduleId: string; type: string; insertIndex?: number }>) => {
      const { moduleId, type, insertIndex } = action.payload;
      const templateItem = {
        id: idNum++,
        text: '<p>新加变量</p>',
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
    }
  }
});

// 导出 分发动作
export const { sameModuleItemDrag, differentModuleItemDrag, addTodoItem } = todoSlice.actions;

// 导出 todo 的 state值, 用 useAppSelector 也行
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
