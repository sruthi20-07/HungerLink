import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {},
  reducers: {
    connectSocket: () => {},
  },
});

export const { connectSocket } = socketSlice.actions;
export default socketSlice.reducer;
