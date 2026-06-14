import type { StockStatus, Variant } from '@/types/product';

export const getStockStatus = (stock: number): StockStatus => {
  if (stock <= 0) {
    return 'sold-out';
  }

  if (stock <= 3) {
    return 'low-stock';
  }

  return 'available';
};

export const isVariantSoldOut = (variant: Variant) => variant.stock <= 0;

export const getMaxPurchasableQuantity = (variant: Variant) => Math.max(1, variant.stock);
