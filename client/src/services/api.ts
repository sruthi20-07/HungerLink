import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  ApiResponse, 
  LoginForm, 
  RegisterForm, 
  User, 
  SurplusReport, 
  SurplusFilters, 
  SurplusForm,
  ProfileUpdateForm 
} from '@/types';
import { getStoredToken, removeAuthToken } from '@/utils/auth';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeAuthToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> =>
    api.post('/auth/login', credentials).then(res => res.data),
    
  register: (userData: RegisterForm): Promise<ApiResponse<{ user: User; token: string }>> =>
    api.post('/auth/register', {
      ...userData,
      location: {
        coordinates: userData.coordinates
      },
    }).then(res => res.data),
    
  getProfile: (): Promise<ApiResponse<{ user: User }>> =>
    api.get('/auth/profile').then(res => res.data),
    
  refreshToken: (token: string): Promise<ApiResponse<{ token: string }>> =>
    api.post('/auth/refresh', { token }).then(res => res.data),
};

// User API
export const userAPI = {
  updateProfile: (data: ProfileUpdateForm): Promise<ApiResponse<{ user: User }>> =>
    api.put('/users/profile', {
      ...data,
      ...(data.coordinates && {
        location: {
          coordinates: data.coordinates
        }
      })
    }).then(res => res.data),
    
  getNearbyUsers: (params: {
    latitude: number;
    longitude: number;
    radius?: number;
    role?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<User[]>> =>
    api.get('/users/nearby', { params }).then(res => res.data),
    
  getUserStats: (): Promise<ApiResponse<any>> =>
    api.get('/users/stats').then(res => res.data),
};

// Surplus API
export const surplusAPI = {
  getSurplusReports: (filters: SurplusFilters): Promise<ApiResponse<SurplusReport[]>> =>
    api.get('/surplus/reports', { params: filters }).then(res => res.data),
    
  getSurplusById: (id: string): Promise<ApiResponse<SurplusReport>> =>
    api.get(`/surplus/reports/${id}`).then(res => res.data),
    
  createSurplusReport: (data: SurplusForm): Promise<ApiResponse<SurplusReport>> =>
    api.post('/surplus/reports', {
      ...data,
      pickupLocation: {
        coordinates: data.coordinates
      },
    }).then(res => res.data),
    
  updateSurplusReport: (id: string, data: Partial<SurplusForm>): Promise<ApiResponse<SurplusReport>> =>
    api.put(`/surplus/reports/${id}`, data).then(res => res.data),
    
  claimSurplus: (id: string, data: { notes?: string }): Promise<ApiResponse<SurplusReport>> =>
    api.post(`/surplus/reports/${id}/claim`, data).then(res => res.data),
    
  completeSurplus: (id: string, data: { 
    actualQuantityCollected?: string; 
    notes?: string; 
  }): Promise<ApiResponse<SurplusReport>> =>
    api.put(`/surplus/reports/${id}/complete`, data).then(res => res.data),
    
  cancelSurplus: (id: string): Promise<ApiResponse<SurplusReport>> =>
    api.delete(`/surplus/reports/${id}`).then(res => res.data),
};

// Notification API
export const notificationAPI = {
  getNotificationHistory: (params?: {
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<any[]>> =>
    api.get('/notifications/history', { params }).then(res => res.data),
    
  updateNotificationPreferences: (preferences: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  }): Promise<ApiResponse<any>> =>
    api.put('/notifications/preferences', preferences).then(res => res.data),
    
  markNotificationAsRead: (id: string): Promise<ApiResponse<any>> =>
    api.put(`/notifications/${id}/read`).then(res => res.data),
    
  registerFCMToken: (token: string): Promise<ApiResponse<any>> =>
    api.post('/notifications/fcm-token', { token }).then(res => res.data),
};

export default api;