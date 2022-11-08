import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import * as Styled from './OptionsDropdown.styles';
import SearchSVG from 'assets/SVG/Search.svg';
import FavoritesSVG from 'assets/SVG/Marked.svg';
import PlusSVG from 'assets/SVG/Plus.svg';
import { SearchBarContext } from 'context/SearchBarContext';

const OptionsDropdown = ({ deleteHandler }: { deleteHandler: () => void }) => {
  const [isOptionsDropdownOpen, setIsOptionsDropdownOpen] = useState(false);
  const { toggleSearchBar } = useContext(SearchBarContext);

  const dropdownOpenRef = useRef(null);

  const handleDropdown = useCallback((e: MouseEvent) => {
    if (dropdownOpenRef.current && e.target === dropdownOpenRef.current) {
      setIsOptionsDropdownOpen((isOpen) => !isOpen);
    } else {
      setIsOptionsDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDropdown);

    return () => {
      document.removeEventListener('click', handleDropdown);
    };
  }, [handleDropdown]);

  return (
    <Styled.Options>
      <Styled.OptionsButton
        aria-label='options'
        ref={dropdownOpenRef}
      >
        <span></span>
        <span></span>
        <span></span>
      </Styled.OptionsButton>

      {isOptionsDropdownOpen && (
        <Styled.OptionsDropdown>
          <li>
            <button onClick={toggleSearchBar}>
              <SearchSVG />
              <span>Search for a meal</span>
            </button>
          </li>
          <li>
            <button>
              <FavoritesSVG />
              <span>Add from favorites</span>
            </button>
          </li>
          <li>
            <button onClick={deleteHandler}>
              <PlusSVG />
              <span>Delete meal section</span>
            </button>
          </li>
        </Styled.OptionsDropdown>
      )}
    </Styled.Options>
  );
};

export default OptionsDropdown;
