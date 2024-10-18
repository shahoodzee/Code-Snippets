import axios from 'axios';
import { getToken } from '../common/Auth/tokenization';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log('Unauthorized! You will need to log in again.');
      window.location.replace('/logout');
    }
    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default api;
