import { configureStore } from '@reduxjs/toolkit';
import userCart from '../features/cartSlice';
import userLogin from '../features/userSlice';
import notification from '../features/notificationSlice';
import page from '../features/pageSlice';

export const store = configureStore({
  reducer: {
    logger: userLogin,
    cart: userCart,
    notifications: notification,
    page: page,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
