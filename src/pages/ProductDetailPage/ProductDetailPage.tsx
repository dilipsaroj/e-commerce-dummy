import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuantityPicker } from '@/components/QuantityPicker/QuantityPicker';
import { VariantSelector } from '@/components/VariantSelector/VariantSelector';
import { InlineMessage } from '@/components/UI/InlineMessage';
import { Price } from '@/components/UI/Price';
import { openCartDrawer } from '@/features/ui/uiSlice';
import { useCartActions } from '@/hooks/useCartActions';
import { useAppDispatch } from '@/hooks/redux';
import { useProduct } from '@/hooks/useProducts';
import { useQuantity } from '@/hooks/useQuantity';
import { useVariantSelection } from '@/hooks/useVariantSelection';
import type { EnrichedProduct, Variant } from '@/types/product';
import { formatCurrency } from '@/utils/currency';
import { getMaxPurchasableQuantity, getStockStatus, isVariantSoldOut } from '@/utils/stock';
import styles from '@/pages/ProductDetailPage/ProductDetailPage.module.scss';

const stockCopy = {
  available: 'In stock and ready to ship.',
  'low-stock': 'Low stock. This variant is moving quickly.',
  'sold-out': 'Sold out. Please try another variant.',
} as const;

const ProductDetailPage = () => {
  const params = useParams();
  const productId = Number(params.productId);
  const dispatch = useAppDispatch();
  const { addVariantToCart } = useCartActions();
  const { data: product, error, isLoading } = useProduct(productId);

  if (Number.isNaN(productId)) {
    return <InlineMessage title="Invalid product" description="The requested product id is not valid." />;
  }

  if (isLoading) {
    return <InlineMessage title="Loading product" description="Building the detail view for this item." />;
  }

  if (error !== null) {
    return <InlineMessage title="Unable to load this product" description={error} />;
  }

  if (product === null) {
    return <InlineMessage title="Product not found" description="We could not find a product that matches this URL." />;
  }

  return (
    <ProductDetailContent
      onAddToCart={(quantity, variant) => {
        addVariantToCart(product, variant, quantity);
        dispatch(openCartDrawer());
      }}
      product={product}
    />
  );
};

export const ProductDetailContent = ({
  product,
  onAddToCart,
}: {
  product: EnrichedProduct;
  onAddToCart: (quantity: number, variant: Variant) => void;
}) => {
  const { selectedVariant, selectColor, selectSize } = useVariantSelection(product);
  const [activeImage, setActiveImage] = useState(0);
  const maxQuantity = getMaxPurchasableQuantity(selectedVariant);
  const { quantity, increment, decrement } = useQuantity(maxQuantity);
  const status = getStockStatus(selectedVariant.stock);
  const availableSizes = useMemo(
    () => product.variants.filter((variant) => variant.color === selectedVariant.color),
    [product.variants, selectedVariant.color],
  );

  useEffect(() => {
    setActiveImage(0);
  }, [selectedVariant.id]);

  return (
    <section className={styles.page}>
      <div className={styles.galleryColumn}>
        <div className={styles.primaryImage}>
          <img alt={product.title} src={selectedVariant.images[activeImage] ?? selectedVariant.images[0]!} />
        </div>

        <div className={styles.thumbnailRow}>
          {selectedVariant.images.map((image, index) => (
            <button
              aria-label={`View product image ${index + 1}`}
              className={activeImage === index ? styles.thumbnailActive : styles.thumbnail}
              key={image}
              onClick={() => {
                setActiveImage(index);
              }}
              type="button"
            >
              <img alt="" src={image} />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.detailsColumn}>
        <div className={styles.overview}>
          <p className={styles.eyebrow}>{product.brand}</p>
          <h1>{product.title}</h1>
          <Price compareAtPrice={product.compareAtPrice} price={product.price} />
          <p className={styles.copy}>{product.description}</p>
          <dl className={styles.meta}>
            <div>
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>
                {product.rating.toFixed(1)} / 5 ({product.reviewCount} reviews)
              </dd>
            </div>
            <div>
              <dt>Selected stock</dt>
              <dd>{selectedVariant.stock} available</dd>
            </div>
          </dl>
        </div>

        <VariantSelector
          onColorSelect={selectColor}
          onSizeSelect={selectSize}
          selectedColor={selectedVariant.color}
          selectedSize={selectedVariant.size}
          variants={product.variants}
        />

        <div className={styles.stockCallout} data-status={status}>
          <strong>{status === 'low-stock' ? 'Low stock' : status === 'sold-out' ? 'Sold out' : 'Available'}</strong>
          <span>{stockCopy[status]}</span>
        </div>

        <div className={styles.purchaseRow}>
          <QuantityPicker max={maxQuantity} onDecrement={decrement} onIncrement={increment} quantity={quantity} />
          <button
            className={styles.addToCartButton}
            disabled={isVariantSoldOut(selectedVariant)}
            onClick={() => {
              onAddToCart(quantity, selectedVariant);
            }}
            type="button"
          >
            {isVariantSoldOut(selectedVariant) ? 'Sold Out' : `Add to cart • ${formatCurrency(product.price * quantity)}`}
          </button>
        </div>

        <div className={styles.availableMatrix}>
          <h2>Available size states for {selectedVariant.color}</h2>
          <ul>
            {availableSizes.map((variant) => (
              <li key={variant.id}>
                <span>{variant.size}</span>
                <strong>{getStockStatus(variant.stock).replace('-', ' ')}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
