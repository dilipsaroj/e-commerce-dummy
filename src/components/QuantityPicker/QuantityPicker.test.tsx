import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuantityPicker } from '@/components/QuantityPicker/QuantityPicker';

const QuantityHarness = ({ max }: { max: number }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <QuantityPicker
      max={max}
      onDecrement={() => {
        setQuantity((current) => Math.max(current - 1, 1));
      }}
      onIncrement={() => {
        setQuantity((current) => Math.min(current + 1, max));
      }}
      quantity={quantity}
    />
  );
};

describe('QuantityPicker', () => {
  it('prevents moving below one or above the provided max', async () => {
    const user = userEvent.setup();

    render(<QuantityHarness max={2} />);

    const decreaseButton = screen.getByRole('button', { name: /decrease quantity/i });
    const increaseButton = screen.getByRole('button', { name: /increase quantity/i });

    expect(decreaseButton).toBeDisabled();

    await user.click(increaseButton);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();

    await user.click(decreaseButton);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(decreaseButton).toBeDisabled();
  });
});
