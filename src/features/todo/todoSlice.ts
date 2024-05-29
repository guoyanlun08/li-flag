import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';
import { TodoListItemType, ListDataMapType } from '@/types/todoType';

import { initialState } from './constants';

/** 根据对应模块分类 */
function classifyTodoList(list: TodoListItemType[]) {
  const obj: ListDataMapType = {} as any;
  list.forEach((todo) => {
    obj[todo.moduleId] ? obj[todo.moduleId].push(todo) : (obj[todo.moduleId] = [todo]);
  });
  return obj;
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // 设置 todoState的 eachModule
    setTodoEntireModule: (state, action: PayloadAction<{ list: [] }>) => {
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
    setTodoModule: (state, action: PayloadAction<{ list: TodoListItemType[]; moduleId: string }>) => {
      const { list, moduleId } = action.payload;

      state.eachModule[moduleId].listData = list;
    },
    // 修改 item值时触发
    setItemTodoValue: (state, action: PayloadAction<{ id: number; moduleId: string; todoValue: string }>) => {
      const { id, moduleId, todoValue } = action.payload;

      const modifyItem: TodoListItemType = state.eachModule[moduleId].listData.find((item) => item.id === id)!;
      modifyItem.todoValue = todoValue;
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
    },
    // 设置 delayListDataMap值
    setDelayListDataMap: (state, action: PayloadAction<{ delayList: TodoListItemType[] }>) => {
      const { delayList } = action.payload;
      state.delayListDataMap = classifyTodoList(delayList);
    }
  }
});

// 导出 分发动作
export const { setTodoEntireModule, setTodoModule, setItemTodoValue, setSelectedId, toggleItemCompletedStatus, setDelayListDataMap } =
  todoSlice.actions;

export { ModuleFields, MODULE_CONFIG_MAP, initialState } from './constants';

// 导出 todo 的 state值, 用 useAppSelector 也行
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
