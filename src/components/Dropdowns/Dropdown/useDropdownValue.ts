import { useState } from 'react';

type DropdownValue<T> = T extends undefined
  ? undefined
  : {
      id: number;
      value: T;
    };

export const useDropdownValue = <T extends string | undefined>(
  initialDropdownValue: DropdownValue<T>
) => {
  const [dropdownValue, setDropdownValue] = useState(initialDropdownValue);

  return { dropdownValue, setDropdownValue };
};
