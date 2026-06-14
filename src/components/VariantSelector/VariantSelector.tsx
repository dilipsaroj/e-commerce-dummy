import clsx from 'clsx';
import type { Variant } from '@/types/product';
import { getStockStatus } from '@/utils/stock';
import styles from '@/components/VariantSelector/VariantSelector.module.scss';

type VariantSelectorProps = {
  variants: Variant[];
  selectedColor: string;
  selectedSize: string;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
};

const statusLabel: Record<ReturnType<typeof getStockStatus>, string> = {
  available: 'Available',
  'low-stock': 'Low stock',
  'sold-out': 'Sold out',
};

const colorSwatchMap: Record<string, string> = {
  Black: '#18181b',
  Ivory: '#f5f1e8',
  Olive: '#5f6b3f',
  Navy: '#213a63',
  Terracotta: '#c86a4a',
  Slate: '#5d6877',
};

const uniqueColors = (variants: Variant[]) => Array.from(new Set(variants.map((variant) => variant.color)));

export const VariantSelector = ({
  variants,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect,
}: VariantSelectorProps) => {
  const colors = uniqueColors(variants);
  const sizes = variants.filter((variant) => variant.color === selectedColor);

  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <div className={styles.headerRow}>
          <span>Colour</span>
          <strong>{selectedColor}</strong>
        </div>
        <div className={styles.colorList} role="list" aria-label="Select colour">
          {colors.map((color) => (
            <button
              key={color}
              aria-pressed={color === selectedColor}
              className={clsx(styles.colorButton, color === selectedColor && styles.colorButtonActive)}
              onClick={() => {
                onColorSelect(color);
              }}
              type="button"
            >
              <span
                aria-hidden="true"
                className={styles.swatch}
                style={{ backgroundColor: colorSwatchMap[color] ?? '#d4d4d8' }}
              />
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.headerRow}>
          <span>Size</span>
          <strong>{selectedSize}</strong>
        </div>
        <div className={styles.sizeList} role="list" aria-label="Select size">
          {sizes.map((variant) => {
            const status = getStockStatus(variant.stock);

            return (
              <button
                key={variant.id}
                aria-pressed={variant.size === selectedSize}
                className={clsx(
                  styles.sizeButton,
                  variant.size === selectedSize && styles.sizeButtonActive,
                  status === 'sold-out' && styles.sizeButtonSoldOut,
                )}
                onClick={() => {
                  onSizeSelect(variant.size);
                }}
                type="button"
              >
                <span>{variant.size}</span>
                <small>{statusLabel[status]}</small>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
