import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './Dropdown.styles';

type DropdownType = {
  label?: string;
  options: { value: string; Component?: React.ReactNode }[];
  dropdownValue: string;
  setDropdownValue: React.Dispatch<React.SetStateAction<string>>;
};

const Dropdown = ({ label, options, dropdownValue, setDropdownValue }: DropdownType) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkIfDropdownChildIsClicked = (dropdownChildList: HTMLCollection, eventTarget: Element) =>
    Array.from(dropdownChildList).reduce((check, child) => {
      if (eventTarget === child) check = true;
      return check;
    }, false);

  const handleDropdown = useCallback((e: any) => {
    const isDropdownClicked =
      (dropdownRef.current &&
        (e.target === dropdownRef.current ||
          checkIfDropdownChildIsClicked(dropdownRef.current?.children[0].children, e.target) ||
          e.target === dropdownRef.current?.children[0])) ||
      e.target === dropdownRef.current?.children[0]?.children[0]?.children[0];

    if (isDropdownClicked) {
      setToggleDropdown((state) => !state);
    } else {
      setToggleDropdown(false);
    }
  }, []);

  const getLabel = useMemo(
    () =>
      (options.find((option) => option.value === dropdownValue)?.Component ?? dropdownValue) ||
      label,
    [dropdownValue, label, options]
  );

  useEffect(() => {
    document.addEventListener('click', handleDropdown);

    return () => {
      document.removeEventListener('click', handleDropdown);
    };
  }, [handleDropdown, setDropdownValue]);

  return (
    <Styled.Wrapper
      ref={dropdownRef}
      role='button'
      aria-pressed={toggleDropdown}
      tabIndex={0}
      onKeyDown={(e) => e.keyCode === 13 && setToggleDropdown((state) => !state)}
    >
      <p>{getLabel}</p>

      {toggleDropdown && (
        <Styled.DropdownList>
          {options.map(({ value, Component }) => (
            <Styled.DropdownListItem key={value}>
              <button
                onKeyDown={(e) => e.keyCode === 13 && setDropdownValue(value)}
                onClick={() => setDropdownValue(value)}
              >
                {Component || value}
              </button>
            </Styled.DropdownListItem>
          ))}
        </Styled.DropdownList>
      )}
    </Styled.Wrapper>
  );
};

export default Dropdown;
