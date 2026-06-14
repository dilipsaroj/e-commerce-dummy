import type { FakeStoreProduct } from '@/types/api';
import type { EnrichedProduct, Variant } from '@/types/product';

const colorPalette = [
  { color: 'Black', hex: '#18181b' },
  { color: 'Ivory', hex: '#f5f1e8' },
  { color: 'Olive', hex: '#5f6b3f' },
  { color: 'Navy', hex: '#213a63' },
  { color: 'Terracotta', hex: '#c86a4a' },
  { color: 'Slate', hex: '#5d6877' },
];

const sizeScaleByCategory: Record<string, string[]> = {
  "men's clothing": ['S', 'M', 'L', 'XL'],
  "women's clothing": ['XS', 'S', 'M', 'L'],
  jewelry: ['One Size'],
  electronics: ['Standard'],
};

const buildImageSet = (baseImage: string, accentHex: string) => [
  baseImage,
  `${baseImage}?variant=detail&accent=${encodeURIComponent(accentHex)}`,
  `${baseImage}?variant=lifestyle&accent=${encodeURIComponent(accentHex)}`,
];

const deriveBrand = (category: string) =>
  category
    .split(/[\s-]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const getSizeScale = (category: string) => sizeScaleByCategory[category] ?? ['Standard'];

const getColorWindow = (productId: number) => {
  const start = productId % colorPalette.length;

  return [
    colorPalette[start]!,
    colorPalette[(start + 2) % colorPalette.length]!,
    colorPalette[(start + 4) % colorPalette.length]!,
  ];
};

const generateStock = (productId: number, colorIndex: number, sizeIndex: number) =>
  (productId * 7 + colorIndex * 5 + sizeIndex * 3) % 9;

export const enrichProduct = (product: FakeStoreProduct): EnrichedProduct => {
  const sizes = getSizeScale(product.category);
  const colors = getColorWindow(product.id);

  const variants: Variant[] = colors.flatMap((swatch, colorIndex) =>
    sizes.map((size, sizeIndex) => ({
      id: `${product.id}-${swatch.color.toLowerCase()}-${size.toLowerCase()}`,
      color: swatch.color,
      size,
      stock: generateStock(product.id, colorIndex, sizeIndex),
      images: buildImageSet(product.image, swatch.hex),
    })),
  );

  const defaultVariant = variants.find((variant) => variant.stock > 0) ?? variants[0]!;
  const hasSalePrice = product.id % 2 === 0;
  const compareAtPrice = hasSalePrice ? Number((product.price * 1.18).toFixed(2)) : null;

  return {
    id: product.id,
    title: product.title,
    brand: deriveBrand(product.category),
    description: product.description,
    category: product.category,
    price: product.price,
    compareAtPrice,
    rating: product.rating.rate,
    reviewCount: product.rating.count,
    variants,
    defaultVariantId: defaultVariant.id,
  };
};
