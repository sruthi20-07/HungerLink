import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import surplusSlice from './slices/surplusSlice';
import socketSlice from './slices/socketSlice';
import notificationSlice from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    surplus: surplusSlice,
    socket: socketSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['socket/setSocket'],
        ignoredPaths: ['socket.socket'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;