import type { EnrichedProduct } from '@/types/product';

export const productFixture: EnrichedProduct = {
  id: 1,
  title: 'Structured Cotton Jacket',
  brand: 'Field Theory',
  description: 'A minimal cotton jacket with a clean silhouette for transitional weather.',
  category: "men's clothing",
  price: 89,
  compareAtPrice: 119,
  rating: 4.5,
  reviewCount: 32,
  defaultVariantId: '1-black-m',
  variants: [
    {
      id: '1-black-s',
      color: 'Black',
      size: 'S',
      stock: 2,
      images: ['https://example.com/black-s-1.png', 'https://example.com/black-s-2.png'],
    },
    {
      id: '1-black-m',
      color: 'Black',
      size: 'M',
      stock: 6,
      images: ['https://example.com/black-m-1.png', 'https://example.com/black-m-2.png'],
    },
    {
      id: '1-olive-s',
      color: 'Olive',
      size: 'S',
      stock: 0,
      images: ['https://example.com/olive-s-1.png', 'https://example.com/olive-s-2.png'],
    },
    {
      id: '1-olive-m',
      color: 'Olive',
      size: 'M',
      stock: 1,
      images: ['https://example.com/olive-m-1.png', 'https://example.com/olive-m-2.png'],
    },
  ],
};
