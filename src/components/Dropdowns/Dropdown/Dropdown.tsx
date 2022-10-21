import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './Dropdown.styles';

type DropdownValueType<T> = {
  id: number;
  value: T;
};

// label or dropdownValue must be provided
type DropdownType<T> = {
  options: { id: number; value: T; Component?: React.ReactNode }[];
} & (
  | {
      label?: string;
      dropdownValue: DropdownValueType<T>;
      setDropdownValue: React.Dispatch<React.SetStateAction<DropdownValueType<T>>>;
    }
  | {
      label: string;
      dropdownValue: DropdownValueType<T> | undefined;
      setDropdownValue: React.Dispatch<React.SetStateAction<DropdownValueType<T> | undefined>>;
    }
);

const Dropdown = <T extends string>({
  label,
  options,
  dropdownValue,
  setDropdownValue,
}: DropdownType<T>) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && e.target === dropdownRef.current) {
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
