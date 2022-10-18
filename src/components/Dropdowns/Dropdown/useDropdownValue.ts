import { useState } from 'react';

type Id =
  | {
      id: number;
    }
  | undefined;

export const useDropdownValue = <T extends Id>(initialDropdownValue: T) => {
  const [dropdownValue, setDropdownValue] = useState(initialDropdownValue);

  return { dropdownValue, setDropdownValue };
};
