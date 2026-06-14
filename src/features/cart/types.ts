import type { StockStatus } from '@/types/product';

export type CartItem = {
  id: string;
  productId: number;
  productTitle: string;
  productCategory: string;
  thumbnail: string;
  variantId: string;
  color: string;
  size: string;
  unitPrice: number;
  quantity: number;
  availableStock: number;
  stockStatus: StockStatus;
};

export type CartState = {
  items: CartItem[];
};
