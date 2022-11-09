import { useState } from 'react';

type ComboboxValue<T> = T extends undefined
  ? undefined
  : {
      id: number;
      value: T;
    };

export const useComboboxValue = <T extends string | undefined>(
  initialComboboxValue: ComboboxValue<T>
) => {
  const [comboboxValue, setComboboxValue] = useState(initialComboboxValue);

  return { comboboxValue, setComboboxValue };
};
