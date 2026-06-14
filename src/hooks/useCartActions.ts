import { addItem } from '@/features/cart/cartSlice';
import { useAppDispatch } from '@/hooks/redux';
import type { EnrichedProduct, Variant } from '@/types/product';
import { getStockStatus } from '@/utils/stock';

export const useCartActions = () => {
  const dispatch = useAppDispatch();

  const addVariantToCart = (product: EnrichedProduct, variant: Variant, quantity: number) => {
    dispatch(
      addItem({
        id: variant.id,
        productId: product.id,
        productTitle: product.title,
        productCategory: product.category,
        thumbnail: variant.images[0]!,
        variantId: variant.id,
        color: variant.color,
        size: variant.size,
        unitPrice: product.price,
        quantity,
        availableStock: variant.stock,
        stockStatus: getStockStatus(variant.stock),
      }),
    );
  };

  return {
    addVariantToCart,
  };
};
