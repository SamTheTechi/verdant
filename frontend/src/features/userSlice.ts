import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface UserState {
  userLogin: boolean;
}

const initialState: UserState = {
  userLogin: false,
};

export const userLogin = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<{ userLogin: boolean }>) => {
      state.userLogin = action.payload.userLogin;
    },
    logIn: (state) => {
      state.userLogin = true;
    },
    logOut: (state) => {
      state.userLogin = false;
    },
  },
});

export const isLoggedIn = (state: RootState) => state.logger.userLogin;

export const { logIn, logOut, initialize } = userLogin.actions;

export default userLogin.reducer;
