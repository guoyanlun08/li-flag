import { DropResult } from 'react-beautiful-dnd';

import { sameModuleItemDrag, getTodoListThunk, differentModuleItemDrag, updateTodoOrderAfterDragThunk } from '@/features/todo/todoSlice';
import { EachModuleType, TodoListItemType } from '@/types/todoType';

function reorderList(list: TodoListItemType[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const onBeforeDragStart = (setDragStatus: (value: boolean) => void) => {
  setDragStatus(true);
};

export const onDragEnd = async (result: DropResult, setDragStatus: (value: boolean) => void, eachModule: EachModuleType, dispatch: any) => {
  const { source, destination } = result;
  setDragStatus(false);

  if (!destination) {
    return;
  }

  const sourceParam = {
    moduleId: source.droppableId,
    index: source.index,
    id: eachModule[source.droppableId].listData[source.index].id
  };

  // 不同模块 destinationParam.id 为 undefined
  const destinationParam = {
    moduleId: destination.droppableId,
    index: destination.index,
    id: eachModule[destination.droppableId].listData?.[destination.index]?.id
  };

  // 是同一 Droppable内的拖拽
  if (source.droppableId === destination.droppableId) {
    const { listData: beforeDragListData } = eachModule[source.droppableId];
    const afterDragListData = reorderList(beforeDragListData, source.index, destination.index);

    dispatch(sameModuleItemDrag({ moduleId: source.droppableId, listData: afterDragListData }));
    const { payload: resp } = await dispatch(
      updateTodoOrderAfterDragThunk({ source: { ...sourceParam }, destination: { ...destinationParam } })
    );

    if (resp) {
      // 这里直接重新获取全数据覆盖，若有问题，这里再调整模块赋值。不同模块也是。
      dispatch(getTodoListThunk({ today: true }));
    } else {
      // 拖拽失败，数据回退
      dispatch(sameModuleItemDrag({ moduleId: source.droppableId, listData: beforeDragListData }));
    }
    // TODO: 交互提示失败
    return;
  }

  // 两个不同的模块之间的拖拽
  const sourceBeforeModule = eachModule[source.droppableId];

  dispatch(differentModuleItemDrag({ source, destination, dragItem: sourceBeforeModule.listData[source.index] }));
  const { payload: resp } = await dispatch(
    updateTodoOrderAfterDragThunk({ source: { ...sourceParam }, destination: { ...destinationParam } })
  );
  if (resp) {
    dispatch(getTodoListThunk({ today: true }));
  } else {
    // 拖拽失败，数据回退
    dispatch(differentModuleItemDrag({ source: destination, destination: source, dragItem: sourceBeforeModule.listData[source.index] }));
    // TODO: 交互提示失败
  }
};
