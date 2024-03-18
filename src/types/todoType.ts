export type TodoStateType = {
  eachModule: EachModuleType;
  eachModuleOrder: string[];
  selectedItem?: TodoListItemType;
};

export type EachModuleType = {
  [property: string]: ModuleDataType;
};

export type ModuleDataType = {
  moduleId: string;
  bgColor: string;
  listData: TodoListItemType[];
};

export interface TodoListItemType {
  id: number;
  moduleId: string;
  todoValue: string;
  completed: number;
  order: number;
  createTime?: number;
  updateTime?: number;
}
