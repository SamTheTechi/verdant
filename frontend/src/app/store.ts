import { configureStore } from '@reduxjs/toolkit';
import userCart from '../features/cartSlice';
import userLogin from '../features/userSlice';
import notification from '../features/notificationSlice'

export const store = configureStore({
  reducer: {
    logger: userLogin,
    cart: userCart,
    notifications: notification,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
