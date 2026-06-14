import { Link } from 'react-router-dom';
import { selectCartItemCount } from '@/features/cart/selectors';
import { toggleCartDrawer } from '@/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IconButton } from '@/components/UI/IconButton';
import styles from '@/components/Navbar/Navbar.module.scss';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const itemCount = useAppSelector(selectCartItemCount);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} to="/">
          <span className={styles.brandMark}>N</span>
          <span>
            <strong>Nua Store</strong>
            <small>Elevated essentials</small>
          </span>
        </Link>

        <IconButton
          aria-label="Open cart"
          badgeCount={itemCount}
          onClick={() => {
            dispatch(toggleCartDrawer());
          }}
        >
          <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
            <path
              d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.9a1 1 0 0 0 1-.8L21 7H7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
            <circle cx="10" cy="19" fill="currentColor" r="1.3" />
            <circle cx="18" cy="19" fill="currentColor" r="1.3" />
          </svg>
        </IconButton>
      </div>
    </header>
  );
};
