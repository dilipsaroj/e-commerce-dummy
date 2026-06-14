import type { ReactNode } from 'react';
import styles from '@/components/UI/InlineMessage.module.scss';

type InlineMessageProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export const InlineMessage = ({ title, description, action }: InlineMessageProps) => (
  <section className={styles.message} aria-live="polite">
    <h2>{title}</h2>
    <p>{description}</p>
    {action}
  </section>
);
