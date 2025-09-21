import api from '@/utils/httpRequest';
import {
  ApiAddEveryDayTodoItemReq,
  ApiAddTeamFlagTodoItemReq,
  ApiUpdateTodoItemReq,
  ApiGetTodoListReq,
  ApiUpdateTodoOrderAfterDragReq,
  apiUpdateTodoOrderData,
  ApiGetTodoItemsForTeamFlagsResp
} from './todoItem.type';

/**
 * 每日模块 - 新增 todoItem 接口
 * @param data 接口参数
 * @returnsA
 */
export async function apiAddEveryDayTodoItem(data: ApiAddEveryDayTodoItemReq) {
  try {
    const resp = await api.post<ApiAddEveryDayTodoItemReq, any>('/todoItem/addEveryDayTodoItem', { ...data });

    if (resp?.code) {
      throw new Error('apiAddEveryDayTodoItem 新增失败');
    }
    return resp.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 团队模块 - 新增 todoItem 接口
 * @param data 接口参数
 * @returnsA
 */
export async function apiAddTeamFlagTodoItem(data: ApiAddTeamFlagTodoItemReq) {
  try {
    const resp = await api.post<ApiAddTeamFlagTodoItemReq, any>('/todoItem/addTeamFlagTodoItem', { ...data });

    if (resp?.code) {
      throw new Error('apiAddTeamFlagTodoItem 新增失败');
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
    const resp = await api.delete<{ id: number }, any>('/todoItem/deleteTodoItemById', { id });

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
export async function apiUpdateTodoItem(data: ApiUpdateTodoItemReq) {
  try {
    const resp = await api.put<ApiUpdateTodoItemReq, any>('/todoItem/updateTodoItem', { ...data });

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
export async function apiGetTodoList(data?: ApiGetTodoListReq) {
  try {
    const resp = await api.get<ApiGetTodoListReq, any>('/todoItem/getTodoList', { ...data });

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
export async function apiUpdateTodoOrderAfterDrag(data: ApiUpdateTodoOrderAfterDragReq) {
  try {
    const { sourceListData, destinationListData, dragItem } = data;
    const resp = await api.put<ApiUpdateTodoOrderAfterDragReq, any>('/todoItem/updateTodoOrderAfterDrag', {
      sourceListData,
      destinationListData,
      dragItem
    });

    if (resp?.code) {
      throw new Error('更新失败');
    }
    return resp.data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 通过 teanFlagId 获取团队 Flag 详情（无关联）
 * @returns
 */
export async function updateTodoOrder(data: apiUpdateTodoOrderData) {
  const resp = await api.put<apiUpdateTodoOrderData, { updated: boolean }>('/todoItem/updateTodoOrder', data);

  if (resp?.code) {
    throw new Error('updateTodoOrder 获取失败');
  }

  return resp.data;
}

/**
 * 获取 teamFlag 下的 todoItem 列表
 */
export async function apiGetTodoItemsForTeamFlags(data?: { teamFlagids: number | number[] }) {
  try {
    const resp = await api.get<{ teamFlagids: number | number[] }, ApiGetTodoItemsForTeamFlagsResp>(
      '/todoItem/getTodoItemsForTeamFlags',
      data
    );

    if (resp?.code) {
      throw new Error('apiGetTodoItemsForTeamFlags 获取失败');
    }
    return resp.data;
  } catch (err) {
    console.error(err);
  }
}
