import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

import { getToken, removeToken } from '@/utils/localStorage';

import { HttpCode, HTTP_STATUS_TEXT } from '@/constants/httpCode';

// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

export const authorizationHeader = {
  Authorization: getToken() || ''
};

// 请求api 函数签名
type ReqFunction = (method: string, url: string, variables?: {}, options?: {}) => Promise<any>;

// axios 默认配置项
const defaults = {
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3000/api',
  headers: () => ({
    ...authorizationHeader,
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
const api: ReqFunction = (method, url, variables, options) => {
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
};

export default {
  get: (...args: [string, object?, object?]) => api('get', ...args),
  post: (...args: [string, object?, object?]) => api('post', ...args),
  put: (...args: [string, object?, object?]) => api('put', ...args),
  delete: (...args: [string, object?, object?]) => api('delete', ...args)
};
