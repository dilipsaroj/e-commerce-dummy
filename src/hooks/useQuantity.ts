import { useEffect, useState } from 'react';

export const useQuantity = (max: number) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity((current) => Math.min(current, Math.max(1, max)));
  }, [max]);

  const increment = () => {
    setQuantity((current) => Math.min(current + 1, max));
  };

  const decrement = () => {
    setQuantity((current) => Math.max(current - 1, 1));
  };

  return {
    quantity,
    setQuantity,
    increment,
    decrement,
  };
};
