import React, { useCallback, useEffect, useState } from 'react';
import { DataItemType } from 'components/GridSection/GridSection';
import Dropdown from './Dropdown/Dropdown';
import styled from 'styled-components';

const StyledSortDropdown = styled.div`
  div {
    width: 100px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.font};

    &:hover {
      border-color: ${({ theme }) => theme.colors.orange};
      ${({ theme }) => theme.boxShadow(theme.colors.orange)};
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.orange};
      outline: 2px solid ${({ theme }) => theme.colors.orange};
    }

    ${({ theme }) => theme.mq.tablet} {
      width: 150px;
      height: 50px;
      font-size: 1.6rem;

      button {
        padding: 15px 20px;
      }
    }
  }
`;

const options = [{ value: 'Name: A - Z' }, { value: 'Name: Z - A' }];

type SortDropdownType = {
  itemsToSort: DataItemType[];
  setLoadingFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortDropdown = ({ itemsToSort, setLoadingFilters }: SortDropdownType) => {
  const [dropdownValue, setDropdownValue] = useState('');

  const filtersHandler = useCallback(
    (data: DataItemType[], option: string) => {
      setLoadingFilters(true);

      if (option === options[0].value) {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if (option === options[1].value) {
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
