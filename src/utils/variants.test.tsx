import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VariantSelector } from '@/components/VariantSelector/VariantSelector';
import { useVariantSelection } from '@/hooks/useVariantSelection';
import { productFixture } from '@/test/fixtures/product';

const VariantSelectionHarness = () => {
  const { selectedVariant, selectColor, selectSize } = useVariantSelection(productFixture);
  const location = useLocation();

  return (
    <div>
      <p data-testid="selected-variant">{selectedVariant.id}</p>
      <p data-testid="current-search">{location.search}</p>
      <VariantSelector
        onColorSelect={selectColor}
        onSizeSelect={selectSize}
        selectedColor={selectedVariant.color}
        selectedSize={selectedVariant.size}
        variants={productFixture.variants}
      />
    </div>
  );
};

describe('variant selection', () => {
  it('restores the selected variant from the URL and updates the URL on change', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/product/1?color=black&size=m']}>
        <Routes>
          <Route element={<VariantSelectionHarness />} path="/product/:productId" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('selected-variant')).toHaveTextContent('1-black-m');
    expect(screen.getByTestId('current-search')).toHaveTextContent('?color=black&size=m');

    await user.click(screen.getByRole('button', { name: /olive/i }));

    expect(screen.getByTestId('selected-variant')).toHaveTextContent('1-olive-m');
    expect(screen.getByTestId('current-search')).toHaveTextContent('?color=olive&size=m');

    await user.click(screen.getByRole('button', { name: /s sold out/i }));

    expect(screen.getByTestId('selected-variant')).toHaveTextContent('1-olive-s');
    expect(screen.getByTestId('current-search')).toHaveTextContent('?color=olive&size=s');
  });
});
