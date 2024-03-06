import { DropResult } from 'react-beautiful-dnd';

import api from '@/utils/httpRequest';
import { sameModuleItemDrag, setTodoModule, differentModuleItemDrag, updateTodoModuleThunk } from '@/features/todo/todoSlice';
import { eachModuleType, todoListItemType } from '@/types/todoType';

function reorderList(list: todoListItemType[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const onBeforeDragStart = (setDragStatus: (value: boolean) => void) => {
  setDragStatus(true);
};

export const onDragEnd = async (result: DropResult, setDragStatus: (value: boolean) => void, eachModule: eachModuleType, dispatch: any) => {
  const { draggableId, source, destination, type } = result;

  setDragStatus(false);

  if (!destination) {
    return;
  }

  // 是同一 Droppable内的拖拽
  if (source.droppableId === destination.droppableId) {
    const { listData: beforeDragListData } = eachModule[source.droppableId];
    const afterDragListData = reorderList(beforeDragListData, source.index, destination.index);

    // TODO: 待确定，这样处理，主要是渲染问题
    dispatch(sameModuleItemDrag({ moduleId: source.droppableId, afterDragListData }));
    const { payload: list } = await dispatch(updateTodoModuleThunk({ listData: afterDragListData }));
    dispatch(setTodoModule({ list, moduleId: source.droppableId }));
    return;
  }

  // 两个不同的模块之间的拖拽
  const sourceModule = eachModule[source.droppableId];
  const dragItem = {
    ...sourceModule.listData[source.index],
    moduleId: destination.droppableId
  };

  dispatch(differentModuleItemDrag({ source, destination, dragItem }));
};
