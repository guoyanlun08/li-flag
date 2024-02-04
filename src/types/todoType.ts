export interface allModuleType {
  eachModule: eachModuleType;
  eachModuleOrder: string[];
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
  text: string;
  completed: boolean;
}
