import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface NotificationState {
  id: number,
  content: string,
  status: boolean,
}

interface NotiState {
  notification: NotificationState[]
}

const initialState: NotiState = {
  notification: []
};

export const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<{ id: number, content: string, status: boolean }>) => {
      const input: NotificationState = {
        id: action.payload.id,
        content: action.payload.content,
        status: action.payload.status,
      }
      state.notification.push(input)
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notification = state.notification.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAllNotification: (state) => {
      state.notification = [];
    }
  },
})

export const userNotification = (state: RootState) => state.notifications.notification;

export const { addNotification, removeNotification, clearAllNotification } = notification.actions;

import { AppDispatch } from '../app/store';

export const setNotification = (content: string, status: boolean, timeout: number = 3000) => {
  return (dispatch: AppDispatch) => {
    const id = Number(Date.now());
    dispatch(addNotification({ id, content, status }));
    setTimeout(() => {
      dispatch(removeNotification(id));
    }, timeout);
  };
};

export default notification.reducer;
