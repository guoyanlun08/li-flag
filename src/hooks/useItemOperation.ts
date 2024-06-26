import { useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import dayjs from 'dayjs';

import { apiAddNewTodoItem, apiDeleteTodoItem, apiUpdateTodoItem, apiGetTodoList, apiUpdateTodoOrderAfterDrag } from '@/apis/todoItem';
import { apiAddTodoItemData, apiUpdateTodoItemData, apiGetTodoListData } from '@/apis/todoItem.type';
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
  const addNewTodoItem = async (moduleId: string, type: 'tail' | 'insert' = 'tail', insertIndex?: number) => {
    const [...listData] = todoState.eachModule[moduleId].listData;

    // tail 直接插入末尾
    let order = listData.length;
    if (!isLogin) {
      openLoginModal();
      return;
    }

    // 从中插入
    if (type === 'insert') {
      order = insertIndex ?? order;
    }

    const { hadAdd, newId } = await apiAddNewTodoItem({ moduleId, order, type });

    if (hadAdd) {
      await getTodoList();
      dispatch(todoAction.setSelectedId({ id: newId }));
    }
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
  const getTodoList = async (data?: apiGetTodoListData) => {
    const { list } = await apiGetTodoList({ ...data, isDefault: 1 });

    if (list) {
      dispatch(todoAction.setTodoEntireModule({ list }));
      return list;
    }
  };

  /** 获取 delayTodoList 数据 --- 主要设置昨天 delay数据 */
  const getDelayTodoList = async () => {
    const data = {
      completed: 0,
      startTime: dayjs().subtract(1, 'day').startOf('day').valueOf(),
      endTime: dayjs().subtract(1, 'day').endOf('day').valueOf()
    };
    const { list: delayList } = await apiGetTodoList(data);

    if (delayList) {
      // 赋值过期数据
      dispatch(todoAction.setDelayListDataMap({ delayList }));
      return delayList;
    }
  };

  /** 初始化 todo 数据 */
  const initTodoSateFn = () => {
    dispatch(todoAction.initTodoSate());
  }

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
        await getTodoList();
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
        await getTodoList();
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

  return { addNewTodoItem, deleteTodoItem, updateTodoItem, getTodoList, getDelayTodoList, initTodoSateFn, onBeforeDragStart, onDragEnd };
}
