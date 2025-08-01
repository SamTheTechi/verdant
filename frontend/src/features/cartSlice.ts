import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';
import { BackendURL } from '../util/url';

export interface CartState {
  _id: string;
  name: string;
  image: string;
  price: number;
  count: number;
}

const initialState: CartState[] = [];

export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<CartState[]>(
        `${BackendURL}/api/v1/cart/item`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userCart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartState>) => {
      return [...state, action.payload];
    },
    removeItem: (state, action: PayloadAction<CartState>) => {
      return state.filter((prod) => prod._id !== action.payload._id);
    },
    clearCart: () => {
      return [];
    }
  },
  extraReducers: (Cart) => {
    Cart.addCase(fetchUserCart.pending, () => {
      return [];
    });
    Cart.addCase(
      fetchUserCart.fulfilled,
      (_, action: PayloadAction<CartState[]>) => {
        return action.payload;
      }
    );
    Cart.addCase(fetchUserCart.rejected, () => {
      return [];
    });
  },
});

export const cartList = (state: RootState) => state.cart;

export default userCart.reducer;

export const { addItem, removeItem, clearCart } = userCart.actions;
