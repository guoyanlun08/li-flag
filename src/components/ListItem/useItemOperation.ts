import { useContext } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { useAppDispatch, AuthContext, useAppSelector } from '@/app/hooks';
import {
  addTodoItemThunk,
  sameModuleItemDrag,
  getTodoListThunk,
  differentModuleItemDrag,
  updateTodoOrderAfterDragThunk,
  setTodoEntireModule,
  deleteTodoItemThunk
} from '@/features/todo/todoSlice';

import { EachModuleType, TodoListItemType } from '@/types/todoType';

/** 调整拖拽后的 todoItemList */
function reorderList(list: TodoListItemType[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

// 操作 item的 hooks
export default function useItemOperation() {
  const { isLogin, openLoginModal } = useContext(AuthContext);
  const todoState = useAppSelector((store) => store.todo);
  const dispatch = useAppDispatch();

  /** 新增 todoItem */
  const addNewTodoItem = async (moduleId: string, type: 'tail' | 'insert' = 'tail') => {
    const listData = todoState.eachModule[moduleId].listData;
    let order = listData.length;
    if (!isLogin) {
      openLoginModal();
      return;
    }

    // 从中插入
    if (type === 'insert') {
      // order =
    }
    await dispatch(addTodoItemThunk({ moduleId, order, type }));
  };

  /** 删除 todoItem */
  const deleteTodoItem = async (id: number) => {
    try {
      await dispatch(deleteTodoItemThunk({ id }));
    } catch (e) {}
  };

  /** 获取 todoList 数据 */
  const getTodoList = async (data: { today?: boolean }) => {
    const { payload: list } = await dispatch(getTodoListThunk(data));
    if (list) {
      dispatch(setTodoEntireModule({ list }));
    }
  };

  /** 拖拽 todoItem前触发 */
  const onBeforeDragStart = (handleSetDragStatus: (value: boolean) => void) => {
    handleSetDragStatus(true);
  };

  /** 拖拽后触发 */
  const onDragEnd = async (result: DropResult, handleSetDragStatus: (value: boolean) => void, eachModule: EachModuleType) => {
    const { source, destination } = result;
    handleSetDragStatus(false);

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
        await getTodoList({ today: true });
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
      await getTodoList({ today: true });
    } else {
      // 拖拽失败，数据回退
      dispatch(differentModuleItemDrag({ source: destination, destination: source, dragItem: sourceBeforeModule.listData[source.index] }));
      // TODO: 交互提示失败
    }
  };

  return { addNewTodoItem, deleteTodoItem, getTodoList, onBeforeDragStart, onDragEnd };
}
