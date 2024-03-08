export interface todoStateType {
  eachModule: eachModuleType;
  eachModuleOrder: string[];
  selectedItem?: todoListItemType;
}

export interface eachModuleType {
  [property: string]: moduleDataType;
}

export interface moduleDataType {
  moduleId: string;
  bgColor: string;
  listData: todoListItemType[];
}

export interface todoListItemType {
  id: number;
  moduleId: string;
  todoValue: string;
  completed: number;
  order: number;
  createTime?: number;
  updateTime?: number;
}
