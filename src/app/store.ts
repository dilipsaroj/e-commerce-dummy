import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/features/cart/cartSlice';
import { loadCartState, saveCartState } from '@/features/cart/persistence';
import { uiReducer } from '@/features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
  },
  preloadedState: {
    cart: loadCartState(),
  },
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
