import { fetchJson } from '@/services/http';
import { enrichProduct } from '@/services/productTransforms';
import type { FakeStoreProduct } from '@/types/api';
import type { EnrichedProduct } from '@/types/product';

export const getProducts = async (): Promise<EnrichedProduct[]> => {
  const products = await fetchJson<FakeStoreProduct[]>('/products');
  return products.map(enrichProduct);
};

export const getProductById = async (productId: number): Promise<EnrichedProduct | null> => {
  try {
    const product = await fetchJson<FakeStoreProduct>(`/products/${productId}`);
    return enrichProduct(product);
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return null;
    }

    throw error;
  }
};
