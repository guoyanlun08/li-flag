export interface allModuleType {
  eachModule: eachModuleType;
  eachModuleOrder: string[];
}

export interface eachModuleType {
  [property: string]: moduleDataType;
}

export interface moduleDataType {
  title: string;
  bgColor: string;
  listData: listItemType[];
}

export interface listItemType {
  id: number;
  text: string;
  completed: boolean;
}
