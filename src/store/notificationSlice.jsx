import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null, // { status, title, message }
};

const notificationSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status, // 'pending' | 'success' | 'error'
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
