import axios from 'axios';
/* eslint-disable no-undef */
const apiUrl = `${API_URL}`;

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
