import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || '/api/';

export const http = axios.create({
  baseURL: apiUrl,
});

export const setToken = (token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default {
  install(app) {
    app.config.globalProperties.http = http;
  },
};
