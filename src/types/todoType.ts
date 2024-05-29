import { ModuleFields } from '@/features/todo/constants';

export type TodoStateType = {
  eachModule: EachModuleType;
  delayListDataMap: ListDataMapType;
  selectedId?: number | undefined;
};

export type EachModuleType = {
  [property: string]: ModuleDataType;
};

/** list 的 { A: [], B: [], C: [], D: []} */
export type ListDataMapType = {
  [property in ModuleFields]: TodoListItemType[];
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
  createTime: number;
  updateTime: number;
  startTime: number;
  endTime: number;
}
