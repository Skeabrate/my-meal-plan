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

  const dropdownRef = useRef<HTMLDivElement>(null);

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
  }, [handleDropdown]);

  return (
    <Styled.Wrapper
      ref={dropdownRef}
      role='button'
      aria-pressed={toggleDropdown}
      tabIndex={0}
      onKeyDown={(e) => e.keyCode === 13 && setToggleDropdown((state) => !state)}
    >
      {option || 'Sort By:'}

      {toggleDropdown && (
        <Styled.DropdownList>
          {items.map((item) => (
            <Styled.DropdownListItem key={item}>
              <button
                onKeyDown={(e) => e.keyCode === 13 && setOption(item)}
                onClick={() => setOption(item)}
              >
                {item}
              </button>
            </Styled.DropdownListItem>
          ))}
        </Styled.DropdownList>
      )}
    </Styled.Wrapper>
  );
};

export default SortDropdown;
