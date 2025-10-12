import { TodoListItemType } from '@/types/todoType';

/** 每日模块新增 todoItem 参数 */
export type ApiAddEveryDayTodoItemReq = {
  moduleId: string;
};

export type ApiAddTeamFlagTodoItemReq = {
  teamFlagId: number;
};

/** 更新 todoItem 参数 */
export type ApiUpdateTodoItemReq = {
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
export type ApiGetTodoListReq = {
  moduleId?: string;
  completed?: number;
  startTime?: number;
  endTime?: number;
  isSkip?: boolean;
};

/** 更改 todoItem order 接口参数 */
export type ApiUpdateTodoOrderAfterDragReq = {
  sourceListData: any;
  destinationListData?: any;
  dragItem?: TodoListItemType;
};

/** 更改 todoItem order 接口参数 */
export type apiUpdateTodoOrderData = {
  todoList: TodoListItemType[];
};

/** 团队Flag todo列表和统计信息的类型 */
type TeamTodoSection = {
  todoList: TodoListItemType[];
  completedTotal: number;
  todoItemTotal: number;
};

/** apiGetTodoItemsForTeamFlags 返回类型 */
export type ApiGetTodoItemsForTeamFlagsResp = {
  [key: string]: TeamTodoSection;
};
