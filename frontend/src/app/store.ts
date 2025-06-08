import { configureStore } from '@reduxjs/toolkit';
import userCart from '../features/cartSlice';
import userLogin from '../features/userSlice';

export const store = configureStore({
  reducer: {
    logger: userLogin,
    cart: userCart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
