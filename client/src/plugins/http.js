import axios from 'axios';
/* eslint-disable no-undef */
const apiUrl = 'http://localhost:3000/';

export const http = axios.create({
  baseURL: apiUrl,
});

export const setToken = (token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default function install(Vue) {
  Object.defineProperty(Vue.prototype, 'http', {
    get() {
      return http;
    },
  });
}
