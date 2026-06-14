import { formatCurrency } from '@/utils/currency';
import styles from '@/components/UI/Price.module.scss';

type PriceProps = {
  price: number;
  compareAtPrice?: number | null;
};

export const Price = ({ price, compareAtPrice }: PriceProps) => (
  <div className={styles.priceBlock}>
    <span className={styles.current}>{formatCurrency(price)}</span>
    {compareAtPrice !== null && compareAtPrice !== undefined ? (
      <span className={styles.compare}>{formatCurrency(compareAtPrice)}</span>
    ) : null}
  </div>
);
