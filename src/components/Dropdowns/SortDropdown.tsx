import React, { useCallback, useEffect, useState } from 'react';
import { DataItemType } from 'components/GridSection/GridSection';
import Dropdown from './Dropdown/Dropdown';

const options = ['Name: A - Z', 'Name: Z - A'];

type SortDropdownType = {
  itemsToSort: DataItemType[];
  setLoadingFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortDropdown = ({ itemsToSort, setLoadingFilters }: SortDropdownType) => {
  const [dropdownValue, setDropdownValue] = useState('');

  const filtersHandler = useCallback(
    (data: DataItemType[], option: string) => {
      setLoadingFilters(true);

      if (option === options[0]) {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if (option === options[1]) {
        data.sort((a, b) => -1 * a.name.localeCompare(b.name));
      }

      setTimeout(() => {
        setLoadingFilters(false);
      }, 200);
    },
    [setLoadingFilters]
  );

  useEffect(() => {
    if (dropdownValue) filtersHandler(itemsToSort, dropdownValue);
  }, [dropdownValue, filtersHandler, itemsToSort]);

  return (
    <Dropdown
      label='Sort by:'
      options={options}
      dropdownValue={dropdownValue}
      setDropdownValue={setDropdownValue}
    />
  );
};

export default SortDropdown;
