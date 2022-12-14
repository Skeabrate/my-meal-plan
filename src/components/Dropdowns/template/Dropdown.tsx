import { useCallback, useEffect, useRef, useState } from 'react';
import * as Styled from './Dropdown.styles';

const Dropdown = ({
  children,
  hideSubMenu,
  ariaLabel,
}: {
  children: React.ReactNode;
  hideSubMenu?: () => void;
  ariaLabel: string;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownOpenRef = useRef(null);

  const handleDropdown = useCallback(
    (e: MouseEvent) => {
      if (dropdownOpenRef.current && e.target === dropdownOpenRef.current) {
        setIsDropdownOpen((isOpen) => !isOpen);
      } else {
        setIsDropdownOpen(false);
        hideSubMenu && hideSubMenu();
      }
    },
    [hideSubMenu]
  );

  useEffect(() => {
    document.addEventListener('click', handleDropdown);

    return () => {
      document.removeEventListener('click', handleDropdown);
    };
  }, [handleDropdown]);

  return (
    <Styled.Wrapper>
      <Styled.ToggleButton
        aria-label={ariaLabel}
        ref={dropdownOpenRef}
      >
        <span></span>
        <span></span>
        <span></span>
      </Styled.ToggleButton>

      {isDropdownOpen && <Styled.Dropdown>{children}</Styled.Dropdown>}
    </Styled.Wrapper>
  );
};

export default Dropdown;
