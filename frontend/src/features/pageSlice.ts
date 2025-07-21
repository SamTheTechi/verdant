import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";


interface PageState {
  currnetPage: number;
}

const initialState: PageState = {
  currnetPage: 0
};

export const page = createSlice({
  name: 'page',
  initialState,
  reducers: {
    increasePage: (state) => {
      state.currnetPage += 1;
    },
    decreasePage: (state) => {
      if (state.currnetPage > 0) {
        state.currnetPage -= 1;
      }
    }
  }
})


export default page.reducer

export const { increasePage, decreasePage } = page.actions;

export const currentPage = (state: RootState) => state.page.currnetPage;

