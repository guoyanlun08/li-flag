import api from '@/utils/httpRequest';
import { apiAddTodoItemData, apiUpdateTodoItemData, apiGetTodoListData, apiUpdateTodoOrderAfterDragData } from './todoItem.type';

/**
 * 新增 todoItem 接口
 * @param data 接口参数
 * @returns
 */
export async function apiAddNewTodoItem(data: apiAddTodoItemData) {
  try {
    const resp = await api.post('/todoItem/addTodoItem', { ...data });

    if (resp?.code) {
      throw new Error('apiAddNewTodoItem 新增失败');
    }
    return resp.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 删除 todoItem 接口
 * @param id todoItem 的id
 * @returns
 */
export async function apiDeleteTodoItem(id: number) {
  try {
    const resp = await api.delete('/todoItem/deleteTodoItemById', { id });

    if (resp?.code) {
      throw new Error('apiDeleteTodoItem 删除失败');
    }
    return resp.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 更新 todoItem接口
 * @param data 接口参数
 * @returns
 */
export async function apiUpdateTodoItem(data: apiUpdateTodoItemData) {
  try {
    const resp = await api.put('/todoItem/updateTodoItem', { ...data });

    if (resp?.code) {
      throw new Error('apiUpdateTodoItem 更新失败');
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 获取 todoList 的接口
 * @param data 接口参数
 * @returns
 */
export async function apiGetTodoList(data?: apiGetTodoListData) {
  try {
    const resp = await api.get('/todoItem/getTodoList', { ...data });

    if (resp?.code) {
      throw new Error('apiGetTodoList 获取失败');
    }
    return resp.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 拖拽后更新 order 接口
 * @param data 接口参数
 * @returns
 */
export async function apiUpdateTodoOrderAfterDrag(data: apiUpdateTodoOrderAfterDragData) {
  try {
    const { sourceListData, destinationListData, dragItem } = data;
    const resp = await api.put('/todoItem/updateTodoOrderAfterDrag', { sourceListData, destinationListData, dragItem });

    if (resp?.code) {
      throw new Error('更新失败');
    }
    return resp.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}
