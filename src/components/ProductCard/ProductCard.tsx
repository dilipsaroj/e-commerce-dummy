import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Price } from '@/components/UI/Price';
import { openCartDrawer } from '@/features/ui/uiSlice';
import { useCartActions } from '@/hooks/useCartActions';
import { useAppDispatch } from '@/hooks/redux';
import type { EnrichedProduct } from '@/types/product';
import { isVariantSoldOut } from '@/utils/stock';
import styles from '@/components/ProductCard/ProductCard.module.scss';

type ProductCardProps = {
  product: EnrichedProduct;
};

const ProductCardComponent = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { addVariantToCart } = useCartActions();
  const defaultVariant =
    product.variants.find((variant) => !isVariantSoldOut(variant)) ?? product.variants[0]!;
  const quickAddDisabled = isVariantSoldOut(defaultVariant);

  const handleQuickAdd = () => {
    addVariantToCart(product, defaultVariant, 1);
    dispatch(openCartDrawer());
  };

  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} to={`/product/${product.id}?color=${defaultVariant.color.toLowerCase()}&size=${defaultVariant.size.toLowerCase()}`}>
        <img alt={product.title} loading="lazy" src={defaultVariant.images[0]} />
      </Link>

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.brand}>{product.brand}</p>
          <Link className={styles.title} to={`/product/${product.id}?color=${defaultVariant.color.toLowerCase()}&size=${defaultVariant.size.toLowerCase()}`}>
            {product.title}
          </Link>
        </div>

        <div className={styles.footer}>
          <Price compareAtPrice={product.compareAtPrice} price={product.price} />
          <button className={styles.button} disabled={quickAddDisabled} onClick={handleQuickAdd} type="button">
            {quickAddDisabled ? 'Sold Out' : 'Quick Add'}
          </button>
        </div>
      </div>
    </article>
  );
};

export const ProductCard = memo(ProductCardComponent);
