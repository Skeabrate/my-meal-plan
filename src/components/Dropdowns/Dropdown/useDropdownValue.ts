import { useState } from 'react';

export type DropdownValueType = {
  id: number;
  value: any;
} | null;

export const useDropdownValue = (initialDropdownValue: DropdownValueType = null) => {
  const [dropdownValue, setDropdownValue] = useState(initialDropdownValue);

  return { dropdownValue, setDropdownValue };
};
