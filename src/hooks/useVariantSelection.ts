import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { EnrichedProduct, Variant } from '@/types/product';
import { getAvailableSizesForColor, resolveVariantFromSearchParams } from '@/utils/variants';

const updateSelectionParams = (variant: Variant, setSearchParams: ReturnType<typeof useSearchParams>[1]) => {
  setSearchParams(
    {
      color: variant.color.toLowerCase(),
      size: variant.size.toLowerCase(),
    },
    { replace: true },
  );
};

export const useVariantSelection = (product: EnrichedProduct) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedVariant = useMemo(
    () =>
      resolveVariantFromSearchParams(
        product.variants,
        searchParams.get('color'),
        searchParams.get('size'),
        product.defaultVariantId,
      ),
    [product.defaultVariantId, product.variants, searchParams],
  );

  const selectColor = (color: string) => {
    const sizeMatch = getAvailableSizesForColor(product.variants, color).find(
      (variant) => variant.size === selectedVariant.size,
    );
    const fallbackVariant = getAvailableSizesForColor(product.variants, color)[0];
    const nextVariant = sizeMatch ?? fallbackVariant;

    if (nextVariant !== undefined) {
      updateSelectionParams(nextVariant, setSearchParams);
    }
  };

  const selectSize = (size: string) => {
    const nextVariant = product.variants.find(
      (variant) => variant.color === selectedVariant.color && variant.size === size,
    );

    if (nextVariant !== undefined) {
      updateSelectionParams(nextVariant, setSearchParams);
    }
  };

  return {
    selectedVariant,
    selectColor,
    selectSize,
  };
};
