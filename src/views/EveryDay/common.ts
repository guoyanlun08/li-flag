import { sameModuleItemDrag, differentModuleItemDrag } from '@/features/todo/todoSlice';
// types
import { DropResult } from 'react-beautiful-dnd';
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

export const onDragEnd = (result: DropResult, setDragStatus: (value: boolean) => void, eachModule: eachModuleType, dispatch: any) => {
  const { draggableId, source, destination, type } = result;

  setDragStatus(false);

  if (!destination) {
    return;
  }

  // 是同一 Droppable内的拖拽
  if (source.droppableId === destination.droppableId) {
    const beforeDragModule = eachModule[source.droppableId];
    const afterDragModule = reorderList(beforeDragModule.listData, source.index, destination.index);

    dispatch(sameModuleItemDrag({ moduleId: source.droppableId, afterDragModule }));
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
