import { Outlet } from 'react-router-dom';
import { CartDrawer } from '@/components/CartDrawer/CartDrawer';
import { Navbar } from '@/components/Navbar/Navbar';
import styles from '@/router/AppLayout.module.scss';

export const AppLayout = () => (
  <div className={styles.shell}>
    <Navbar />
    <main className={styles.main}>
      <Outlet />
    </main>
    <CartDrawer />
  </div>
);
