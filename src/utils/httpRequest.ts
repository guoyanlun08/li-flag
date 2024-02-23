import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
// import qs from 'qs'
import { showMessage } from "./status";
import { message } from 'antd';

// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

let http:AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// axios实例拦截响应
http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      localStorage.setItem('SESSION_TOKEN', response.headers.authorization);
    } else {
      if (response.data && response.data.token) {
        localStorage.setItem('SESSION_TOKEN', response.data.token);
      }
    }

    if (response.status === 200) {
      return response;
    } else {
      showMessage(response.status);
      return response;
    }
  },
  // 请求失败
  (error: any) => {
    const {response} = error;
    if (response) {
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
    const token = localStorage.getItem('SESSION_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
)
export default http;