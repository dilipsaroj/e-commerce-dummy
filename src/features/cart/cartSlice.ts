import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '@/features/cart/types';

const initialState: CartState = {
  items: [],
};

const findCartItemIndex = (items: CartItem[], variantId: string) =>
  items.findIndex((item) => item.variantId === variantId);

const clampQuantity = (quantity: number, stock: number) => Math.max(1, Math.min(quantity, stock));

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const index = findCartItemIndex(state.items, action.payload.variantId);

      if (index === -1) {
        state.items.push(action.payload);
        return;
      }

      const existingItem = state.items[index];

      if (existingItem === undefined) {
        return;
      }

      existingItem.quantity = clampQuantity(
        existingItem.quantity + action.payload.quantity,
        existingItem.availableStock,
      );
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ variantId: string; quantity: number }>,
    ) => {
      const index = findCartItemIndex(state.items, action.payload.variantId);

      if (index === -1) {
        return;
      }

      const item = state.items[index];

      if (item === undefined) {
        return;
      }

      item.quantity = clampQuantity(action.payload.quantity, item.availableStock);
    },
    removeItem: (state, action: PayloadAction<{ variantId: string }>) => {
      state.items = state.items.filter((item) => item.variantId !== action.payload.variantId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateItemQuantity, removeItem, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
