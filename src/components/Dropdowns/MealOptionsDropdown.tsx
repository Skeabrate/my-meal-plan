import { useFavorites } from 'context/FavoritesContext';
import Dropdown from './template/Dropdown';
import MarkedSvg from 'assets/SVG/Marked.svg';
import UnMarkedSvg from 'assets/SVG/UnMarked.svg';
import MealSvg from 'assets/SVG/Meal.svg';
import styled from 'styled-components';
import { useState } from 'react';

const StyledWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
`;

const MealOptionsDropdown = ({ mealId }: { mealId: string }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // if session -> meal plans -> days -> meal sections
  const [subMenuItems, setSubMenuItems] = useState([]);

  const { isMealAlreadyFavorite, handleFavorites } = useFavorites(mealId);

  return (
    <StyledWrapper>
      <Dropdown>
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
          <button onClick={() => setIsSubMenuOpen((isOpen) => !isOpen)}>
            <MealSvg />
            <span>Add to Meal Plan</span>
          </button>

          {/* {isSubMenuOpen && (
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          )} */}
        </li>
      </Dropdown>
    </StyledWrapper>
  );
};

export default MealOptionsDropdown;
