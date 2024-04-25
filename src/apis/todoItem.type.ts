import { TodoListItemType } from '@/types/todoType';

/** 新增 todoItem 参数 */
export type apiAddTodoItemData = {
  moduleId: string;
  order: number;
  type: 'tail' | 'insert';
};

/** 更新 todoItem 参数 */
export type apiUpdateTodoItemData = {
  id: number;
  completed?: number;
  todoValue?: string;
  startTime?: string;
  endTime?: string;
};

/** 获取 todoItem 数据参数  */
export type apiGetTodoListData = {
  moduleId?: string;
  completed?: number;
  startTime?: string;
  endTime?: string;
  isSkip?: boolean;
  isDefault?: number;
};

/** 更改 todoItem order 接口参数 */
export type apiUpdateTodoOrderAfterDragData = {
  sourceListData: any;
  destinationListData?: any;
  dragItem?: TodoListItemType;
};
