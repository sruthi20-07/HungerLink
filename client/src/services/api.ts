import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { getStoredToken, removeAuthToken } from '../utils/auth';
import { SurplusForm, ProfileUpdateForm } from '../types';

// Use environment variable if available, otherwise fallback to localhost for local dev
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const surplusAPI = {
  create: (data: SurplusForm) => api.post('/surplus', data),
  getAll: () => api.get('/surplus'),
  getOne: (id: string) => api.get(`/surplus/${id}`),
  update: (id: string, data: Partial<SurplusForm>) =>
    api.put(`/surplus/${id}`, data),
  remove: (id: string) => api.delete(`/surplus/${id}`),
};

export const profileAPI = {
  update: (data: ProfileUpdateForm) => api.put('/profile', data),
};

export default api;
