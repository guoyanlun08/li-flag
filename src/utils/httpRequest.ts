import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

import { getToken, removeToken } from '@/utils/localStorage';

import { HttpCode, HTTP_STATUS_TEXT } from '@/constants/httpCode';

/** 返回res的interface */
export interface IResponse<U> {
  code: number | string;
  data: U;
  msg?: string;
}

export const authorizationHeader = () => ({
  Authorization: getToken() ?? ''
});

// axios 默认配置项
const defaults = {
  baseURL: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:3000/api',
  headers: () => ({
    ...authorizationHeader(),
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: HttpCode.SERVER_ERROR,
    data: {}
  }
};

/** 请求api, 需要额外的 header 通过 options参数传递，再进行处理*/
function api<T, U>(method: string, url: string, variables?: T, options?: {}): Promise<IResponse<U>> {
  return new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined
    }).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        const { response } = error;
        if (response) {
          if (response.status === HttpCode.FORBIDDEN) {
            removeToken();
          } else {
            // message.error(HTTP_STATUS_TEXT(response.status));
            reject(response.data);
          }
        } else {
          message.error(HTTP_STATUS_TEXT(HttpCode.SERVER_ERROR));
          reject(defaults.error);
        }
      }
    );
  });
}

const httpRequest = {
  get: <T, U>(...args: [string, T?, object?]) => api<T, U>('get', ...args),
  post: <T, U>(...args: [string, T?, object?]) => api<T, U>('post', ...args),
  put: <T, U>(...args: [string, T?, object?]) => api<T, U>('put', ...args),
  delete: <T, U>(...args: [string, T?, object?]) => api<T, U>('delete', ...args)
};

export default httpRequest;
