import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TodoListItemType, ListDataMapType } from '@/types/todoType';
import { ModuleFields } from '@/features/todo/constants';

import { initialState } from './constants';
import dayjs from 'dayjs';

/** 根据对应模块分类 */
function classifyModuleList(list: TodoListItemType[]) {
  const obj: ListDataMapType = {
    A: [],
    B: [],
    C: [],
    D: []
  };
  list.forEach((todo) => obj[todo.moduleId].push(todo));
  return obj;
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    /** 设置 今天的 todo 和 延期的 todo */
    setTodayAndDelayTodo(state, action: PayloadAction<{ list: TodoListItemType[] }>) {
      const { list } = action.payload;
      const todayList: TodoListItemType[] = [];
      const delayList: TodoListItemType[] = [];
      const todayStartTime = dayjs().startOf('day');

      list.forEach((todo) => {
        const { endTime, completed } = todo;
        if (dayjs(endTime).isBefore(todayStartTime)) {
          !completed && delayList.push(todo);
        } else {
          todayList.push(todo);
        }
      });
      const classifyTodayList = classifyModuleList(todayList);
      const classifyDelayList = classifyModuleList(delayList);

      (Object.keys(classifyDelayList) as ModuleFields[]).forEach((moduleId) => {
        state.delayListDataMap[moduleId] = classifyDelayList[moduleId].sort((a, b) => a.order - b.order);
      });

      (Object.keys(state.eachModule) as ModuleFields[]).forEach((moduleId) => {
        state.eachModule[moduleId].listData = classifyTodayList[moduleId];
        state.eachModule[moduleId].listData.sort((a, b) => a.order - b.order);
      });
    },

    /** 设置 todoState 单独 module数据 */
    setTodoModule: (state, action: PayloadAction<{ list: TodoListItemType[]; moduleId: string }>) => {
      const { list, moduleId } = action.payload;

      state.eachModule[moduleId].listData = list;
    },

    /** 初始化 todoState 数据 */
    initTodoSate: (state, action: PayloadAction) => {
      state = initialState;

      return state;
    }
  }
});

/** 导出 分发动作 */
export const todoAction = todoSlice.actions;

export { ModuleFields, MODULE_CONFIG_MAP, initialState } from './constants';

export default todoSlice.reducer;
