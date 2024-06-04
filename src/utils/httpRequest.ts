import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

import { getToken, removeToken } from '@/utils/localStorage';

import { HttpCode, HTTP_STATUS_TEXT } from '@/constants/httpCode';

/** 返回res的interface */
export interface IResponse {
  code: number | string;
  data: any;
  msg?: string;
}

export const authorizationHeader = () => ({
  Authorization: getToken() ?? ''
});

// axios 默认配置项
const defaults = {
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api',
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
function api<T>(method: string, url: string, variables?: T, options?: {}): Promise<IResponse> {
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

export default {
  get: <T>(...args: [string, T?, object?]) => api<T>('get', ...args),
  post: <T>(...args: [string, T?, object?]) => api<T>('post', ...args),
  put: <T>(...args: [string, T?, object?]) => api<T>('put', ...args),
  delete: <T>(...args: [string, T?, object?]) => api<T>('delete', ...args)
};
