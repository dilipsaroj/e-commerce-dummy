import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ProductDetailContent } from '@/pages/ProductDetailPage/ProductDetailPage';
import { cartReducer } from '@/features/cart/cartSlice';
import { uiReducer } from '@/features/ui/uiSlice';
import { productFixture } from '@/test/fixtures/product';

const renderWithProviders = (initialEntry: string) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      ui: uiReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route
            element={<ProductDetailContent onAddToCart={vi.fn()} product={productFixture} />}
            path="/product/:productId"
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
};

describe('ProductDetailContent', () => {
  it('disables the add to cart CTA for sold out variants', () => {
    renderWithProviders('/product/1?color=olive&size=s');

    expect(screen.getByRole('button', { name: 'Sold Out' })).toBeDisabled();
    expect(screen.getByText(/sold out\. please try another variant/i)).toBeInTheDocument();
  });
});
