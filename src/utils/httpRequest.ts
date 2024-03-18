import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { message } from 'antd';

import { getToken, removeToken } from '@/utils/localStorage';

import { HttpCode, showMessage } from '@/constants/httpCode';

// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

type ReqFunction = (method: string, url: string, variables?: {}, options?: {}) => Promise<any>;

const http: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3020/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// axios实例拦截响应
http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === HttpCode.SUCCESS) {
      return response.data;
    } else {
      showMessage(response.status);
      return response.data;
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      if (response.status === HttpCode.FORBIDDEN || response.status === HttpCode.UNAUTHORIZED) {
        // token 非法移除 token
        removeToken();
        // 调出登录弹窗

        return;
      }
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      message.error('网络连接异常,请稍后再试!');
    }
  }
);

// axios实例拦截请求
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

const api: ReqFunction = (method, url, variables, options) => {
  return new Promise((resolve, reject) => {
    http({
      url,
      method,
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined
      // headers: options.header,
    }).then(
      (data) => resolve(data),
      (error) => reject(error)
    );
  });
};

export default {
  get: (...args: [string, object?, object?]) => api('get', ...args),
  post: (...args: [string, object?, object?]) => api('post', ...args),
  put: (...args: [string, object?, object?]) => api('put', ...args),
  delete: (...args: [string, object?, object?]) => api('delete', ...args)
};
