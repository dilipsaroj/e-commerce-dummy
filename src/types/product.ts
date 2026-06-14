export type StockStatus = 'available' | 'low-stock' | 'sold-out';

export type Variant = {
  id: string;
  color: string;
  size: string;
  stock: number;
  images: string[];
};

export type ProductVariantOption = {
  value: string;
  label: string;
};

export type EnrichedProduct = {
  id: number;
  title: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
  variants: Variant[];
  defaultVariantId: string;
};
