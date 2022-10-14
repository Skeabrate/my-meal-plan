import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './Dropdown.styles';
import { DropdownValueType } from './useDropdownValue';

type DropdownType = {
  label?: string;
  options: { id: number; value: string; Component?: React.ReactNode }[];
  dropdownValue: DropdownValueType;
  setDropdownValue: React.Dispatch<React.SetStateAction<DropdownValueType>>;
};

const Dropdown: React.FunctionComponent<DropdownType> = ({
  label,
  options,
  dropdownValue,
  setDropdownValue,
}) => {
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
      (options.find((option) => option.id === dropdownValue?.id)?.Component ??
        dropdownValue?.value) ||
      label,
    [dropdownValue, label, options]
  );

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
      <Styled.Label>{getLabel}</Styled.Label>

      {toggleDropdown && (
        <Styled.DropdownList>
          {options.map(({ id, value, Component }) => (
            <Styled.DropdownListItem key={id}>
              <button
                onKeyDown={(e) => e.keyCode === 13 && setDropdownValue({ id, value })}
                onClick={() => setDropdownValue({ id, value })}
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
