import type { Variant } from '@/types/product';

export type VariantSelection = {
  color: string;
  size: string;
};

const normalizeValue = (value: string) => value.trim().toLowerCase();

export const findVariantBySelection = (
  variants: Variant[],
  selection: Partial<VariantSelection>,
): Variant | undefined =>
  variants.find(
    (variant) =>
      normalizeValue(variant.color) === normalizeValue(selection.color ?? '') &&
      normalizeValue(variant.size) === normalizeValue(selection.size ?? ''),
  );

export const getAvailableSizesForColor = (variants: Variant[], color: string) =>
  variants.filter((variant) => normalizeValue(variant.color) === normalizeValue(color));

export const getAvailableColors = (variants: Variant[]) =>
  Array.from(new Set(variants.map((variant) => variant.color)));

export const getAvailableSizes = (variants: Variant[]) =>
  Array.from(new Set(variants.map((variant) => variant.size)));

export const resolveVariantFromSearchParams = (
  variants: Variant[],
  color: string | null,
  size: string | null,
  defaultVariantId: string,
): Variant => {
  const exactMatch = findVariantBySelection(variants, {
    color: color ?? '',
    size: size ?? '',
  });

  if (exactMatch !== undefined) {
    return exactMatch;
  }

  const defaultVariant = variants.find((variant) => variant.id === defaultVariantId);

  return defaultVariant ?? variants[0]!;
};
