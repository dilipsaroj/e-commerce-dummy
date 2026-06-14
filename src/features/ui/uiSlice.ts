import { createSlice } from '@reduxjs/toolkit';

type UiState = {
  isCartDrawerOpen: boolean;
};

const initialState: UiState = {
  isCartDrawerOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCartDrawer: (state) => {
      state.isCartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.isCartDrawerOpen = false;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
  },
});

export const { openCartDrawer, closeCartDrawer, toggleCartDrawer } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
