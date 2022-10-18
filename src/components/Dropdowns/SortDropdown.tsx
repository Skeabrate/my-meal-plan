import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { DataItemType } from 'components/GridSection/GridSection';
import Dropdown from './Dropdown/Dropdown';
import { useDropdownValue } from './Dropdown/useDropdownValue';

const StyledSortDropdown = styled.div`
  width: 100px;
  height: 40px;

  div {
    border: 1px solid ${({ theme }) => theme.colors.font};

    button {
      text-align: center;
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.orange};
      ${({ theme }) => theme.boxShadow(theme.colors.orange)};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.orange};
      outline: 2px solid ${({ theme }) => theme.colors.orange};
    }
  }

  ${({ theme }) => theme.mq.tablet} {
    width: 150px;
    height: 50px;

    div button {
      padding: 15px 20px;
      text-align: left;
    }
  }
`;

const options = [
  { id: 0, value: 'Name: A - Z' },
  { id: 1, value: 'Name: Z - A' },
];

type SortDropdownType = {
  itemsToSort: DataItemType[];
  setLoadingFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortDropdown = ({ itemsToSort, setLoadingFilters }: SortDropdownType) => {
  const { dropdownValue, setDropdownValue } = useDropdownValue<
    { id: number; value: string } | undefined
  >(undefined);

  const filtersHandler = useCallback(
    (data: DataItemType[], dropdownValue: string) => {
      setLoadingFilters(true);

      if (dropdownValue === options[0].value) {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if (dropdownValue === options[1].value) {
        data.sort((a, b) => -1 * a.name.localeCompare(b.name));
      }

      setTimeout(() => {
        setLoadingFilters(false);
      }, 200);
    },
    [setLoadingFilters]
  );

  useEffect(() => {
    if (dropdownValue) filtersHandler(itemsToSort, dropdownValue.value);
  }, [dropdownValue, filtersHandler, itemsToSort]);

  return (
    <StyledSortDropdown>
      <Dropdown
        label='Sort by:'
        options={options}
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
      />
    </StyledSortDropdown>
  );
};

export default SortDropdown;
