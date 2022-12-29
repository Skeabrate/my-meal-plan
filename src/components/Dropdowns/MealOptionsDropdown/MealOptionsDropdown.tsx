import React, { useState } from 'react';
import { useFavorites } from 'context/FavoritesContext';
import styled from 'styled-components';
import Dropdown from '../template/Dropdown';
import MarkedSvg from 'assets/SVG/Marked';
import UnMarkedSvg from 'assets/SVG/UnMarked';
import MealSvg from 'assets/SVG/Meal';
import SubDropdown from './SubDropdown/SubDropdown';

const StyledWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
`;

const MealOptionsDropdown = ({ mealId }: { mealId: string }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const { isMealAlreadyFavorite, handleFavorites } = useFavorites(mealId);

  const handleSubDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsSubMenuOpen((isOpen) => !isOpen);
  };

  return (
    <StyledWrapper>
      <Dropdown
        ariaLabel='open meal options'
        hideSubMenu={() => setIsSubMenuOpen(false)}
      >
        <li>
          <button onClick={handleFavorites}>
            {isMealAlreadyFavorite ? (
              <>
                <MarkedSvg />
                <span>Remove from Favorites</span>
              </>
            ) : (
              <>
                <UnMarkedSvg />
                <span>Add to Favorites</span>
              </>
            )}
          </button>
        </li>

        <li>
          <button onClick={handleSubDropdown}>
            <MealSvg />
            <span>Add to Meal Plan</span>
          </button>

          {isSubMenuOpen && <SubDropdown mealId={mealId} />}
        </li>
      </Dropdown>
    </StyledWrapper>
  );
};

export default MealOptionsDropdown;
