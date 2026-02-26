import { store } from '@/store';
import { message } from 'antd';
import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 请求头中添加 token
    const { token } = store.getState().auth;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 处理请求失败情况
    if (response.data && response.data.code !== 200) {
      message.error(`${response.data.code}:${response.data.message || '请求失败'}`);
      return Promise.reject(new Error(response.data.message || '请求失败'));
    }
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default http;
