import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import surplusReducer from './slices/surplusSlice';
import socketReducer from './slices/socketSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    surplus: surplusReducer,
    socket: socketReducer,
    notifications: notificationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
