import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Styled from './SortDropdown.styles';
import { DataItemType } from 'components/GridSection/GridSection';

const items = ['Name: A - Z', 'Name: Z - A'];

const SortDropdown = ({
  data,
  loadingFilters,
  setLoadingFilters,
}: {
  data: DataItemType[];
  loadingFilters: boolean;
  setLoadingFilters: Function;
}) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [option, setOption] = useState('');

  const dropdownRef = useRef(null);

  const handleDropdown = useCallback(
    (e: any) => {
      if (loadingFilters) return;
      if (e.target === dropdownRef.current) setToggleDropdown((state) => !state);
      else setToggleDropdown(false);
    },
    [loadingFilters]
  );

  const filtersHandler = useCallback(
    (data: DataItemType[], option: string) => {
      setLoadingFilters(true);

      if (option === items[0]) {
        data.sort((a, b) => a.name.localeCompare(b.name));
      } else if (option === items[1]) {
        data.sort((a, b) => -1 * a.name.localeCompare(b.name));
      }

      setTimeout(() => {
        setLoadingFilters(false);
      }, 10);
    },
    [setLoadingFilters]
  );

  useEffect(() => {
    if (option) filtersHandler(data, option);
  }, [option, data, filtersHandler]);

  useEffect(() => {
    document.addEventListener('click', handleDropdown);

    return () => {
      document.removeEventListener('click', handleDropdown);
    };
  }, [loadingFilters, handleDropdown]);

  return (
    <Styled.Wrapper
      tabIndex={1}
      ref={dropdownRef}
    >
      {option ? option : 'Sort By:'}

      {toggleDropdown && (
        <Styled.DropdownList>
          {items.map((item) => (
            <li
              key={item}
              onClick={() => setOption(item)}
            >
              {item}
            </li>
          ))}
        </Styled.DropdownList>
      )}
    </Styled.Wrapper>
  );
};

export default SortDropdown;
