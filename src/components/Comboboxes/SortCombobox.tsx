import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { DataItemType } from 'components/GridSection/GridSection';
import { useComboboxValue } from './template/useComboboxValue';
import Combobox from './template/Combobox';

const StyledSortCombobox = styled.div`
  width: 100px;
  height: 40px;

  div {
    border: 1px solid ${({ theme }) => theme.themeColors.font};

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

type SortComboboxType = {
  itemsToSort: DataItemType[];
  setLoadingFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortCombobox = ({ itemsToSort, setLoadingFilters }: SortComboboxType) => {
  const { comboboxValue, setComboboxValue } = useComboboxValue(undefined);

  const filtersHandler = useCallback(
    (data: DataItemType[], comboboxValue: string) => {
      setLoadingFilters(true);

      if (comboboxValue === options[0].value) {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if (comboboxValue === options[1].value) {
        data.sort((a, b) => -1 * a.name.localeCompare(b.name));
      }

      setTimeout(() => {
        setLoadingFilters(false);
      }, 200);
    },
    [setLoadingFilters]
  );

  useEffect(() => {
    if (comboboxValue) filtersHandler(itemsToSort, comboboxValue.value);
  }, [comboboxValue, filtersHandler, itemsToSort]);

  return (
    <StyledSortCombobox>
      <Combobox
        label='Sort by:'
        options={options}
        comboboxValue={comboboxValue}
        setComboboxValue={setComboboxValue}
      />
    </StyledSortCombobox>
  );
};

export default SortCombobox;
