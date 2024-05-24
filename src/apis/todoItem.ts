import api from '@/utils/httpRequest';
import { apiAddTodoItemData, apiUpdateTodoItemData, apiGetTodoListData, apiUpdateTodoOrderAfterDragData } from './todoItem.type';

/**
 * 新增 todoItem 接口
 * @param data 接口参数
 * @returns
 */
export async function apiAddNewTodoItem(data: apiAddTodoItemData) {
  const resp = await api.post('/todoItem/addTodoItem', { ...data });

  if (resp?.code) {
    console.error('apiAddNewTodoItem 新增失败');
  }

  return resp.data;
}

/**
 * 删除 todoItem 接口
 * @param id todoItem 的id
 * @returns
 */
export async function apiDeleteTodoItem(id: number) {
  const resp = await api.delete('/todoItem/deleteTodoItemById', { id });

  if (resp.code) {
    console.error('apiDeleteTodoItem 删除失败');
  }

  return resp.data;
}

/**
 * 更新 todoItem接口
 * @param data 接口参数
 * @returns
 */
export async function apiUpdateTodoItem(data: apiUpdateTodoItemData) {
  const resp = await api.put('/todoItem/updateTodoItem', { ...data });

  if (resp?.code) {
    console.error('apiUpdateTodoItem 更新失败');
    return false;
  }
  return true;
}

/**
 * 获取 todoList 的接口
 * @param data 接口参数
 * @returns
 */
export async function apiGetTodoList(data?: apiGetTodoListData) {
  const resp = await api.get('/todoItem/getTodoList', { ...data });

  if (resp?.code) {
    console.error('apiGetTodoList 获取失败');
  }

  return resp.data;
}

/**
 * 拖拽后更新 order 接口
 * @param data 接口参数
 * @returns
 */
export async function apiUpdateTodoOrderAfterDrag(data: apiUpdateTodoOrderAfterDragData) {
  const { sourceListData, destinationListData, dragItem } = data;
  const resp = await api.put('/todoItem/updateTodoOrderAfterDrag', { sourceListData, destinationListData, dragItem });

  if (resp?.code) {
    console.error('更新失败');
  }

  return resp.data;
}
