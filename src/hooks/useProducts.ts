import { useEffect, useState } from 'react';
import { getProductById, getProducts } from '@/services/productsApi';
import type { EnrichedProduct } from '@/types/product';

type QueryState<T> = {
  data: T;
  isLoading: boolean;
  error: string | null;
};

export const useProducts = () => {
  const [state, setState] = useState<QueryState<EnrichedProduct[]>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    void getProducts()
      .then((products) => {
        if (!isMounted) {
          return;
        }

        setState({
          data: products,
          isLoading: false,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        setState({
          data: [],
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unable to load products.',
        });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};

export const useProduct = (productId: number) => {
  const [state, setState] = useState<QueryState<EnrichedProduct | null>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    void getProductById(productId)
      .then((product) => {
        if (!isMounted) {
          return;
        }

        setState({
          data: product,
          isLoading: false,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) {
          return;
        }

        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unable to load this product.',
        });
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return state;
};
