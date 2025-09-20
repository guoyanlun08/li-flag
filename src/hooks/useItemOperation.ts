import { useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import dayjs from 'dayjs';

import { apiAddEveryDayTodoItem, apiDeleteTodoItem, apiUpdateTodoItem, apiGetTodoList, apiUpdateTodoOrderAfterDrag } from '@/apis/todoItem';
import { apiUpdateTodoItemData } from '@/apis/todoItem.type';
import { useAppDispatch, AuthContext, useAppSelector } from '@/app/hooks';
import { ModuleFields, todoAction } from '@/features/todo/todoSlice';
import { EachModuleType, TodoListItemType } from '@/types/todoType';

type DropResultSelf = DropResult & {
  source: { droppableId: ModuleFields };
  destination: { droppableId: ModuleFields };
};

/** 调整拖拽后的 todoItemList */
function reorderList(list: TodoListItemType[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

/** 操作 item的 hooks */
export default function useItemOperation() {
  const { isLogin, openLoginModal } = useContext(AuthContext);
  const todoState = useAppSelector((store) => store.todo);
  const dispatch = useAppDispatch();

  /** 新增 todoItem */
  const addEveryDayTodoItem = async (moduleId: string) => {
    if (!isLogin) {
      openLoginModal();
      return;
    }

    const resp = await apiAddEveryDayTodoItem({ moduleId });
    return resp;
  };

  /** 删除 todoItem */
  const deleteTodoItem = async (id: number) => {
    await apiDeleteTodoItem(id);
  };

  /** 更改 todoItem */
  const updateTodoItem = async (data: apiUpdateTodoItemData) => {
    const resp = await apiUpdateTodoItem(data);

    return resp;
  };

  /** 获取 todoList 数据 */
  const getEveryDayTodoList = async () => {
    const { list } = await apiGetTodoList({
      startTime: dayjs().subtract(1, 'day').startOf('day').valueOf(),
      endTime: dayjs().endOf('day').valueOf()
    });

    if (list) {
      dispatch(todoAction.setTodayAndDelayTodo({ list }));
      return list;
    }
  };

  /** 初始化 todo 数据 */
  const initTodoSateFn = () => {
    dispatch(todoAction.initTodoSate());
  };

  /** 拖拽 todoItem前触发 */
  const onBeforeDragStart = (handleSetDragStatus: (value: boolean) => void) => {
    handleSetDragStatus(true);
  };

  /** 拖拽后触发 */
  const onDragEnd = async (result: DropResultSelf, handleSetDragStatus: (value: boolean) => void, eachModule: EachModuleType) => {
    const { source, destination } = result;
    handleSetDragStatus(false);

    if (!destination) {
      return;
    }

    // 是同一 Droppable内的拖拽
    if (source.droppableId === destination.droppableId) {
      const { listData: beforeDragListData } = eachModule[source.droppableId];
      const afterDragListData = reorderList(beforeDragListData, source.index, destination.index);

      dispatch(todoAction.setTodoModule({ moduleId: source.droppableId, list: afterDragListData }));
      const resp = await apiUpdateTodoOrderAfterDrag({ sourceListData: afterDragListData });

      if (resp.updated) {
        await getEveryDayTodoList();
      } else {
        // 拖拽失败，数据回退
        dispatch(todoAction.setTodoModule({ moduleId: source.droppableId, list: beforeDragListData }));
      }
    } else {
      /** 两个不同的模块之间的拖拽 */
      const {
        listData: [...sourceListData]
      } = eachModule[source.droppableId];
      const {
        listData: [...destinationListData]
      } = eachModule[destination.droppableId];

      // 获取拖拽项，且改变 moduleId
      const dragItem = { ...sourceListData[source.index] };
      dragItem.moduleId = destination.droppableId;

      // 源头去除该拖拽 item; 终点插入 item
      sourceListData.splice(source.index, 1);
      destinationListData.splice(destination.index, 0, dragItem);
      dispatch(todoAction.setTodoModule({ moduleId: source.droppableId, list: sourceListData }));
      dispatch(todoAction.setTodoModule({ moduleId: destination.droppableId, list: destinationListData }));

      const resp = await apiUpdateTodoOrderAfterDrag({ sourceListData, destinationListData, dragItem });
      if (resp.updated) {
        await getEveryDayTodoList();
      } else {
        // 拖拽失败，数据回退
        dispatch(
          todoAction.setTodoModule({ moduleId: eachModule[source.droppableId].moduleId, list: eachModule[source.droppableId].listData })
        );
        dispatch(
          todoAction.setTodoModule({
            moduleId: eachModule[destination.droppableId].moduleId,
            list: eachModule[destination.droppableId].listData
          })
        );
      }
    }
  };

  return {
    addEveryDayTodoItem,
    deleteTodoItem,
    updateTodoItem,
    getEveryDayTodoList,
    initTodoSateFn,
    onBeforeDragStart,
    onDragEnd
  };
}
