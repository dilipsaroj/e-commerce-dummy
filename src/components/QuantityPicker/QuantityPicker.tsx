import styles from '@/components/QuantityPicker/QuantityPicker.module.scss';

type QuantityPickerProps = {
  quantity: number;
  max: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export const QuantityPicker = ({ quantity, max, onIncrement, onDecrement }: QuantityPickerProps) => (
  <div className={styles.picker} aria-label="Quantity picker">
    <button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={onDecrement} type="button">
      -
    </button>
    <span aria-live="polite">{quantity}</span>
    <button aria-label="Increase quantity" disabled={quantity >= max} onClick={onIncrement} type="button">
      +
    </button>
  </div>
);
