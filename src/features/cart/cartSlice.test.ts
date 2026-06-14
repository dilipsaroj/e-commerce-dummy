import { addItem, cartReducer, removeItem, updateItemQuantity } from '@/features/cart/cartSlice';
import type { CartState } from '@/features/cart/types';

const baseState: CartState = {
  items: [],
};

const item = {
  id: '1-black-m',
  productId: 1,
  productTitle: 'Structured Cotton Jacket',
  productCategory: "men's clothing",
  thumbnail: 'https://example.com/black.png',
  variantId: '1-black-m',
  color: 'Black',
  size: 'M',
  unitPrice: 89,
  quantity: 1,
  availableStock: 3,
  stockStatus: 'available' as const,
};

describe('cartSlice', () => {
  it('adds items and clamps repeated additions to available stock', () => {
    const firstPass = cartReducer(baseState, addItem(item));
    const secondPass = cartReducer(firstPass, addItem({ ...item, quantity: 3 }));

    expect(secondPass.items).toHaveLength(1);
    expect(secondPass.items[0]?.quantity).toBe(3);
  });

  it('updates item quantity and removes items', () => {
    const withItem = cartReducer(baseState, addItem(item));
    const updated = cartReducer(
      withItem,
      updateItemQuantity({
        variantId: item.variantId,
        quantity: 2,
      }),
    );
    const emptied = cartReducer(updated, removeItem({ variantId: item.variantId }));

    expect(updated.items[0]?.quantity).toBe(2);
    expect(emptied.items).toHaveLength(0);
  });
});
