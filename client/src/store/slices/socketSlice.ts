import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import { RootState } from '@/store';

interface SocketState {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
}

const initialState: SocketState = {
  socket: null,
  connected: false,
  error: null,
};

export const initializeSocket = createAsyncThunk(
  'socket/initialize',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { user, token } = state.auth;
    
    if (!user || !token) {
      throw new Error('User not authenticated');
    }

    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      auth: {
        token,
      },
    });

    // Set up event listeners
    socket.on('connect', () => {
      dispatch(setConnected(true));
      socket.emit('join-room', user._id);
    });

    socket.on('disconnect', () => {
      dispatch(setConnected(false));
    });

    socket.on('connect_error', (error) => {
      dispatch(setError(error.message));
    });

    // Surplus-related events
    socket.on('surplus-created', (data) => {
      // Handle new surplus notification
      dispatch({ type: 'surplus/addNewReport', payload: data });
      dispatch({
        type: 'notifications/addNotification',
        payload: {
          type: 'surplus_available',
          title: 'New Surplus Available',
          message: `${data.foodType} available for pickup`,
          data: data,
          timestamp: new Date().toISOString(),
        },
      });
    });

    socket.on('surplus-claimed', (data) => {
      // Handle surplus claimed notification
      dispatch({ type: 'surplus/updateReportInList', payload: data });
      dispatch({
        type: 'notifications/addNotification',
        payload: {
          type: 'pickup_claimed',
          title: 'Surplus Claimed',
          message: `Your surplus has been claimed by ${data.claimedBy?.organizationName}`,
          data: data,
          timestamp: new Date().toISOString(),
        },
      });
    });

    socket.on('surplus-completed', (data) => {
      // Handle surplus completion notification
      dispatch({ type: 'surplus/updateReportInList', payload: data });
      dispatch({
        type: 'notifications/addNotification',
        payload: {
          type: 'pickup_completed',
          title: 'Pickup Completed',
          message: 'Surplus pickup has been completed successfully',
          data: data,
          timestamp: new Date().toISOString(),
        },
      });
    });

    socket.on('surplus-cancelled', (data) => {
      // Handle surplus cancellation notification
      dispatch({ type: 'surplus/updateReportInList', payload: data });
      dispatch({
        type: 'notifications/addNotification',
        payload: {
          type: 'status_update',
          title: 'Surplus Cancelled',
          message: 'A surplus you were interested in has been cancelled',
          data: data,
          timestamp: new Date().toISOString(),
        },
      });
    });

    socket.on('urgent-reminder', (data) => {
      // Handle urgent reminders
      dispatch({
        type: 'notifications/addNotification',
        payload: {
          type: 'urgent_reminder',
          title: 'Urgent: Surplus Expiring Soon',
          message: `${data.foodType} expires in ${data.timeRemaining} minutes`,
          data: data,
          timestamp: new Date().toISOString(),
          urgent: true,
        },
      });
    });

    return socket;
  }
);

export const disconnectSocket = createAsyncThunk(
  'socket/disconnect',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { socket } = state.socket;
    
    if (socket) {
      socket.disconnect();
    }
  }
);

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket>) => {
      state.socket = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
        state.error = null;
      })
      .addCase(initializeSocket.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to initialize socket';
      })
      .addCase(disconnectSocket.fulfilled, (state) => {
        state.socket = null;
        state.connected = false;
      });
  },
});

export const { setSocket, setConnected, setError, clearError } = socketSlice.actions;
export default socketSlice.reducer;