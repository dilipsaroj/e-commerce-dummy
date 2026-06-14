import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from '@/components/UI/IconButton.module.scss';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  badgeCount?: number;
  children: ReactNode;
};

export const IconButton = ({ className, badgeCount, children, ...props }: IconButtonProps) => (
  <button className={clsx(styles.button, className)} type="button" {...props}>
    {children}
    {badgeCount !== undefined && badgeCount > 0 ? <span className={styles.badge}>{badgeCount}</span> : null}
  </button>
);
