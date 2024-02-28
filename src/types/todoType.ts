export interface todoStateType {
  eachModule: eachModuleType;
  eachModuleOrder: string[];
  selectedId: number | undefined;
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
  value: {}[];
  completed: number;
}
