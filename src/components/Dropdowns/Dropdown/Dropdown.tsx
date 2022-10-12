import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Styled from './Dropdown.styles';

type DropdownType = {
  label: string;
  options: string[];
  dropdownValue: string;
  setDropdownValue: React.Dispatch<React.SetStateAction<string>>;
};

const Dropdown = ({ label, options, dropdownValue, setDropdownValue }: DropdownType) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdown = useCallback((e: any) => {
    if (e.target === dropdownRef.current) setToggleDropdown((state) => !state);
    else setToggleDropdown(false);
  }, []);

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
      {dropdownValue || label}

      {toggleDropdown && (
        <Styled.DropdownList>
          {options.map((option) => (
            <Styled.DropdownListItem key={option}>
              <button
                onKeyDown={(e) => e.keyCode === 13 && setDropdownValue(option)}
                onClick={() => setDropdownValue(option)}
              >
                {option}
              </button>
            </Styled.DropdownListItem>
          ))}
        </Styled.DropdownList>
      )}
    </Styled.Wrapper>
  );
};

export default Dropdown;
