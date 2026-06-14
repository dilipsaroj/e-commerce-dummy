import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/router/AppLayout';
import { InlineMessage } from '@/components/UI/InlineMessage';

const ProductListingPage = lazy(() => import('@/pages/ProductListingPage/ProductListingPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage/ProductDetailPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<InlineMessage title="Loading products" description="Preparing the catalog." />}>
            <ProductListingPage />
          </Suspense>
        ),
      },
      {
        path: 'product/:productId',
        element: (
          <Suspense fallback={<InlineMessage title="Loading product" description="Preparing the detail view." />}>
            <ProductDetailPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <InlineMessage title="Page not found" description="The page you requested does not exist." />,
      },
    ],
  },
]);
