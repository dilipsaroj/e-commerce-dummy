import clsx from 'clsx';
import { removeItem, updateItemQuantity } from '@/features/cart/cartSlice';
import {
  selectCartGrandTotal,
  selectCartItems,
  selectCartSubtotal,
} from '@/features/cart/selectors';
import { closeCartDrawer } from '@/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { formatCurrency } from '@/utils/currency';
import styles from '@/components/CartDrawer/CartDrawer.module.scss';

export const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const grandTotal = useAppSelector(selectCartGrandTotal);
  const isOpen = useAppSelector((state) => state.ui.isCartDrawerOpen);

  return (
    <>
      <button
        aria-hidden={!isOpen}
        className={clsx(styles.overlay, isOpen && styles.overlayOpen)}
        onClick={() => {
          dispatch(closeCartDrawer());
        }}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />

      <aside
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
        className={clsx(styles.drawer, isOpen && styles.drawerOpen)}
      >
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Your Cart</p>
            <h2>Ready to check out</h2>
          </div>
          <button
            aria-label="Close cart"
            className={styles.closeButton}
            onClick={() => {
              dispatch(closeCartDrawer());
            }}
            type="button"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <p className={styles.emptyState}>Your cart is empty. Add a product to get started.</p>
          ) : (
            items.map((item) => (
              <article className={styles.item} key={item.variantId}>
                <img alt={item.productTitle} src={item.thumbnail} />
                <div className={styles.itemDetails}>
                  <div>
                    <h3>{item.productTitle}</h3>
                    <p>
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <p className={styles.itemPrice}>{formatCurrency(item.unitPrice)}</p>
                  <div className={styles.itemActions}>
                    <label>
                      <span className="sr-only">Quantity</span>
                      <select
                        aria-label={`Quantity for ${item.productTitle}`}
                        onChange={(event) => {
                          dispatch(
                            updateItemQuantity({
                              variantId: item.variantId,
                              quantity: Number(event.target.value),
                            }),
                          );
                        }}
                        value={item.quantity}
                      >
                        {Array.from({ length: item.availableStock }, (_, index) => index + 1).map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      onClick={() => {
                        dispatch(removeItem({ variantId: item.variantId }));
                      }}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className={styles.summary}>
          <div>
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div>
            <span>Grand total</span>
            <strong>{formatCurrency(grandTotal)}</strong>
          </div>
        </div>
      </aside>
    </>
  );
};
