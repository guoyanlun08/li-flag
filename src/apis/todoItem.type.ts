import { TodoListItemType } from '@/types/todoType';

/** 每日模块新增 todoItem 参数 */
export type apiAddEveryDayTodoItemData = {
  moduleId: string;
};

export type apiAddTeamFlagTodoItemData = {
  teamFlagId: number;
};

/** 更新 todoItem 参数 */
export type apiUpdateTodoItemData = {
  id: number;
  completed?: number;
  todoValue?: string;
  startTime?: number;
  endTime?: number;
  processor?: string;
  priority?: string;
  processingStatus?: number;
};

/** 获取 todoItem 数据参数  */
export type apiGetTodoListData = {
  moduleId?: string;
  completed?: number;
  startTime?: number;
  endTime?: number;
  isSkip?: boolean;
};

/** 更改 todoItem order 接口参数 */
export type apiUpdateTodoOrderAfterDragData = {
  sourceListData: any;
  destinationListData?: any;
  dragItem?: TodoListItemType;
};

/** 更改 todoItem order 接口参数 */
export type apiUpdateTodoOrderData = {
  todoList: TodoListItemType[];
};
