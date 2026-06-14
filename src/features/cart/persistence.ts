import type { CartState } from '@/features/cart/types';

const CART_STORAGE_KEY = 'nua-store-cart';

const initialCartState: CartState = {
  items: [],
};

export const loadCartState = (): CartState => {
  if (typeof window === 'undefined') {
    return initialCartState;
  }

  try {
    const rawState = window.localStorage.getItem(CART_STORAGE_KEY);

    if (rawState === null) {
      return initialCartState;
    }

    const parsedState = JSON.parse(rawState) as CartState;

    if (!Array.isArray(parsedState.items)) {
      return initialCartState;
    }

    return parsedState;
  } catch {
    return initialCartState;
  }
};

export const saveCartState = (state: CartState) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
};
