import { ModuleFields } from '@/features/todo/constants';

export type TodoStateType = {
  eachModule: EachModuleType;
  selectedItem?: TodoListItemType;
};

export type EachModuleType = {
  [property: string]: ModuleDataType;
};

export type ModuleDataType = {
  moduleId: ModuleFields;
  color: string;
  title: string;
  listData: TodoListItemType[];
};

export interface TodoListItemType {
  id: number;
  moduleId: ModuleFields;
  todoValue: string;
  completed: number;
  order: number;
  createTime: string;
  updateTime: string;
  startTime: string;
  endTime: string;
}
