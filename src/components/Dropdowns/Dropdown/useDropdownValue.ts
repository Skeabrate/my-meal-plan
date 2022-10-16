import { useState } from 'react';

export type DropdownValueType =
  | {
      id: number;
      value: any;
    }
  | undefined;

export const useDropdownValue = (initialDropdownValue: DropdownValueType = undefined) => {
  const [dropdownValue, setDropdownValue] = useState(initialDropdownValue);

  return { dropdownValue, setDropdownValue };
};
